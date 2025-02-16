import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";  // Assuming the Button component exists in your project
import { Card, CardContent } from "@/components/ui/Card";  // Assuming the Card components exists in your project

function Lessons() {
  const [lessons, setLessons] = useState([]);
  const navigate = useNavigate();

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

  const handleViewDetails = (lessonId) => {
    navigate(`/admin/lessons/${lessonId}`);
  };

  const handleEdit = (lessonId) => {
    toast.info(`Edit Lesson ID: ${lessonId}`);
  };

  const handleDelete = (lessonId) => {
    toast.success(`Lesson ID: ${lessonId} deleted`);
  };

  return (
    <div className="container mx-auto p-6">
      <Card>
      <div className=" flex justify-end">
          <Link className=" px-4 py-2 rounded-lg bg-blue-500 text-white" to="/admin/createlesson">AddLessons</Link>
        </div>
        <CardContent>
          <h2 className="text-2xl font-semibold mb-4">Lessons</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">ID</th>
                  <th className="py-3 px-6 text-left">Title</th>
                  <th className="py-3 px-6 text-left">Display</th>
                  <th className="py-3 px-6 text-left">Course</th>
                  <th className="py-3 px-6 text-left">Class Assigned</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {lessons.length > 0 ? (
                  lessons.map((lesson) => (
                    <tr key={lesson.id} className="border-b border-gray-200 hover:bg-gray-100">
                      <td className="py-3 px-6 text-left">{lesson.id}</td>
                      <td className="py-3 px-6 text-left">{lesson.title}</td>
                      <td className="py-3 px-6 text-left">{lesson.display}</td>
                      <td className="py-3 px-6 text-left">{lesson.course}</td>
                      <td className="py-3 px-6 text-left">{lesson.class_assigned}</td>
                      <td className="py-3 px-6 text-center flex space-x-2">
                        <Button
                          className="bg-blue-500 text-white px-4 py-2 rounded-md"
                          onClick={() => handleViewDetails(lesson.id)}
                        >
                          View Details
                        </Button>
                        <Button
                          className="bg-green-500 text-white px-4 py-2 rounded-md"
                          onClick={() => handleEdit(lesson.id)}
                        >
                          Edit
                        </Button>
                        <Button
                          className="bg-red-500 text-white px-4 py-2 rounded-md"
                          onClick={() => handleDelete(lesson.id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4">No lessons available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Lessons;
