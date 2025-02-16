import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // ReactQuill CSS
import "react-toastify/dist/ReactToastify.css";

function AddTeachersNotes() {
  const navigate = useNavigate();

  // Form state variables
  const [title, setTitle] = useState("");
  const [lesson, setLesson] = useState("");
  const [content, setContent] = useState("");
  const [price, setPrice] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Fetch lessons when component mounts
  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          throw new Error("Access token is missing. Please log in.");
        }
        const response = await axios.get("https://api.genesisonlineschool.rw/api/lessons/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLessons(response.data);
      } catch (error) {
        console.error("Error fetching lessons:", error);
        toast.error("Failed to fetch lessons");
      }
    };

    fetchLessons();
  }, []);

  // Handle file input changes
  const handleVideoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0]);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      toast.error("Access token or user information missing. Please log in.");
      return;
    }

    if (!videoFile) {
      toast.error("Please select a video file to upload.");
      return;
    }

    // Create a FormData object to handle file uploads
    const formData = new FormData();
    formData.append("title", title);
    formData.append("lesson", lesson);
    formData.append("content", content);
    formData.append("price", price);
    formData.append("video", videoFile);
    formData.append("created_by", userId);

    try {
      await axios.post("https://api.genesisonlineschool.rw/api/notes/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        // Track progress of the video upload
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        },
      });
      toast.success("Note created successfully!");
      navigate("/admin/notes");
    } catch (error) {
      console.error("Error creating note:", error);
      toast.error("Failed to create note");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 w-full">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="bg-blue-500 px-6 py-4">
          <h2 className="text-white text-2xl font-bold text-center">
            Add Teachers Notes
          </h2>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            {/* Title */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Enter note title"
                required
              />
            </div>

            {/* Lesson Selection */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Lesson
              </label>
              <select
                value={lesson}
                onChange={(e) => setLesson(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
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

            {/* Content using ReactQuill */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Content
              </label>
              <ReactQuill
                value={content}
                onChange={setContent}
                theme="snow"
                className="bg-white"
                placeholder="Enter note content..."
              />
            </div>

            {/* Price */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Price
              </label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Enter note price"
                required
              />
            </div>

            {/* Video Uploader */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Video
              </label>
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoChange}
                className="w-full text-gray-700"
                required
              />
            </div>

            {/* Progress Bar */}
            {uploadProgress > 0 && (
              <div className="mb-4">
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-blue-500 h-4 rounded-full"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <p className="text-gray-700 text-sm mt-1">
                  {uploadProgress}% uploaded
                </p>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded"
              >
                Add Note
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddTeachersNotes;
