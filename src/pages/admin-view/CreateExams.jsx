import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the Quill CSS
import "react-toastify/dist/ReactToastify.css";

function CreateExams() {
  const navigate = useNavigate();

  // Form state
  const [title, setTitle] = useState("");
  const [display, setDisplay] = useState("");
  const [lesson, setLesson] = useState("");
  const [year, setYear] = useState("");
  const [content, setContent] = useState("");
  const [price, setPrice] = useState("");
  const [examType, setExamType] = useState("national");
  const [lessons, setLessons] = useState([]);

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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      toast.error("Access token or user information missing. Please log in.");
      return;
    }

    const examData = {
      title,
      display,
      lesson: parseInt(lesson),
      year,
      content,
      price,
      created_by: parseInt(userId),
      exam_type: examType,
    };

    try {
      await axios.post("https://api.genesisonlineschool.rw/api/exams/", examData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Exam created successfully!");
      navigate("/admin/exams");
    } catch (error) {
      console.error("Error creating exam:", error);
      toast.error("Failed to create exam");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="bg-blue-500 px-6 py-4">
          <h2 className="text-white text-2xl font-bold text-center">Create Exam</h2>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            {/* Title and Display */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter exam title"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Display</label>
                <input
                  type="text"
                  value={display}
                  onChange={(e) => setDisplay(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter display name"
                  required
                />
              </div>
            </div>

            {/* Lesson and Year */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Lesson</label>
                <select
                  value={lesson}
                  onChange={(e) => setLesson(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
              <div>
                <label className="block text-gray-700 font-medium mb-2">Year</label>
                <input
                  type="text"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter exam year"
                  required
                />
              </div>
            </div>

            {/* Content */}
            <div className="mt-4">
              <label className="block text-gray-700 font-medium mb-2">Content</label>
              <ReactQuill
                value={content}
                onChange={setContent}
                theme="snow"
                className="bg-white"
                placeholder="Enter exam content..."
              />
            </div>

            {/* Price and Exam Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Price</label>
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter exam price"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Exam Type</label>
                <select
                  value={examType}
                  onChange={(e) => setExamType(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                >
                  <option value="national">National</option>
                  <option value="state">State</option>
                  <option value="private">Private</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded"
              >
                Create Exam
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateExams;
