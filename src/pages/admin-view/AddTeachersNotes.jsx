import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-toastify/dist/ReactToastify.css";

function AddTeachersNotes() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    lesson: "",
    content: "",
    price: "",
    videoFile: null,
  });

  const [lessons, setLessons] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) throw new Error("Access token is missing. Please log in.");

        const response = await axios.get("https://api.genesisonlineschool.rw/api/lessons/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setLessons(response.data);
      } catch (error) {
        console.error("Error fetching lessons:", error);
        toast.error(error.response?.data?.message || "Failed to fetch lessons");
      }
    };

    fetchLessons();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleVideoChange = (e) => {
    if (e.target.files?.[0]) {
      setFormData((prev) => ({ ...prev, videoFile: e.target.files[0] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      toast.error("Access token or user information missing. Please log in.");
      setLoading(false);
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("lesson", formData.lesson);
    data.append("content", formData.content);
    data.append("price", formData.price);
    data.append("created_by", userId);

    if (formData.videoFile) {
      data.append("video", formData.videoFile);
    }

    try {
      await axios.post("https://api.genesisonlineschool.rw/api/notes/", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percent);
        },
      });

      toast.success("Note added successfully!");
      navigate("/admin/notes");
    } catch (error) {
      console.error("Error creating note:", error);
      toast.error(error.response?.data?.message || "Failed to create note");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 w-full">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="bg-blue-500 px-6 py-4">
          <h2 className="text-white text-2xl font-bold text-center">Add Teacher's Notes</h2>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-green-400"
                placeholder="Enter note title"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Lesson</label>
              <select
                name="lesson"
                value={formData.lesson}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-green-400"
                required
              >
                <option value="">Select a lesson</option>
                {lessons.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.display} - {l.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Content</label>
              <ReactQuill
                value={formData.content}
                onChange={(value) => setFormData((prev) => ({ ...prev, content: value }))}
                theme="snow"
                className="bg-white"
                placeholder="Enter note content..."
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Price</label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-green-400"
                placeholder="Enter note price"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Video (Optional)</label>
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoChange}
                className="w-full text-gray-700"
              />
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-2 font-semibold rounded ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600 text-white"}`}
              >
                {loading ? "Uploading..." : "Add Note"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddTeachersNotes;
