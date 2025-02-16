import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

function ViewExamDetails() {
  const { id } = useParams();
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExamDetails = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          toast.error("Access token is missing. Please log in.");
          return;
        }
        const response = await axios.get(`http://197.243.27.49/api/exams/${id}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setExam(response.data);
      } catch (error) {
        console.error("Error fetching exam details:", error);
        toast.error("Failed to fetch exam details");
      } finally {
        setLoading(false);
      }
    };

    fetchExamDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <p className="text-xl text-gray-700 animate-pulse">Loading exam details...</p>
      </div>
    );
  }

  if (!exam) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <p className="text-xl text-gray-700">Exam not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 w-full">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-blue-600 p-6 text-white text-center">
          <h1 className="text-3xl font-bold">{exam.title}</h1>
          <p className="text-lg text-blue-200 mt-1">{exam.display}</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: "Lesson", value: exam.lesson },
              { label: "Year", value: exam.year },
              { label: "Price", value: `$${exam.price}` },
              { label: "Exam Type", value: exam.exam_type },
              { label: "Level", value: exam.level },
              { label: "Class Name", value: exam.class_name },
              { label: "Course Name", value: exam.course_name },
              { label: "Total Pages", value: exam.total_pages },
            ].map((item, index) => (
              <div key={index}>
                <p className="text-sm text-gray-500 font-medium uppercase">{item.label}</p>
                <p className="text-lg text-gray-900 font-semibold">{item.value}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <p className="text-sm text-gray-500 font-medium uppercase mb-2">Content</p>
            <div className="p-4 border border-gray-300 rounded bg-gray-100 text-gray-900 text-lg leading-relaxed whitespace-pre-wrap">
              {exam.content}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewExamDetails;
