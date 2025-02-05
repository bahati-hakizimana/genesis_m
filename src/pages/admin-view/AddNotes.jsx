import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";  // Assuming Button component exists in your project
import { useNavigate } from "react-router-dom";

function AddNotes() {
  const [lessons, setLessons] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    lesson: "",
    pdf_document: "",
    video_url: "",
    price: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId"); // Assuming userId is stored in localStorage after login

  useEffect(() => {
    // Fetch lessons to populate the dropdown
    const fetchLessons = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/lessons/");
        setLessons(response.data);
      } catch (error) {
        console.error("Error fetching lessons:", error);
        toast.error("Failed to fetch lessons");
      }
    };

    fetchLessons();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      pdf_document: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSubmit = new FormData();
      formDataToSubmit.append("title", formData.title);
      formDataToSubmit.append("lesson", formData.lesson);
      formDataToSubmit.append("created_by", userId);
      formDataToSubmit.append("pdf_document", formData.pdf_document);
      formDataToSubmit.append("video_url", formData.video_url);
      formDataToSubmit.append("price", formData.price);

      const response = await axios.post(
        "http://127.0.0.1:8000/api/notes/",
        formDataToSubmit,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      toast.success("Note added successfully!");
      navigate("/admin/notes"); // Redirect to the notes page
    } catch (error) {
      console.error("Error adding note:", error);
      toast.error("Failed to add note");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Add New Note</h2>
        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-600">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Lesson */}
          <div className="mb-4">
            <label htmlFor="lesson" className="block text-sm font-medium text-gray-600">
              Select Lesson
            </label>
            <select
              id="lesson"
              name="lesson"
              value={formData.lesson}
              onChange={handleChange}
              required
              className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Select a Lesson --</option>
              {lessons.map((lesson) => (
                <option key={lesson.id} value={lesson.id}>
                  {lesson.title}
                </option>
              ))}
            </select>
          </div>

          {/* PDF Document */}
          <div className="mb-4">
            <label htmlFor="pdf_document" className="block text-sm font-medium text-gray-600">
              PDF Document
            </label>
            <div className="flex items-center mt-2">
              <label
                htmlFor="pdf_document"
                className="cursor-pointer text-blue-600 flex items-center space-x-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 4v16c0 1.104.896 2 2 2h14c1.104 0 2-.896 2-2V4c0-1.104-.896-2-2-2H5c-1.104 0-2 .896-2 2zm2 0h14v16H5V4z"
                  />
                </svg>
                <span>Upload PDF</span>
              </label>
              <input
                type="file"
                id="pdf_document"
                name="pdf_document"
                onChange={handleFileChange}
                accept=".pdf"
                className="hidden"
              />
            </div>
          </div>

          {/* Video URL */}
          <div className="mb-4">
            <label htmlFor="video_url" className="block text-sm font-medium text-gray-600">
              Video URL
            </label>
            <input
              type="url"
              id="video_url"
              name="video_url"
              value={formData.video_url}
              onChange={handleChange}
              className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Price */}
          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-medium text-gray-600">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              {loading ? "Adding..." : "Add Note"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddNotes;
