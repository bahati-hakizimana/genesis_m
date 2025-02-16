import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button"; // Assuming the Button component exists in your project
import { Card, CardContent } from "@/components/ui/card"; // Assuming the Card components exist in your project

function Exams() {
  const [exams, setExams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          throw new Error("Access token is missing. Please log in.");
        }

        const response = await axios.get("http://197.243.27.49/api/exams/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setExams(response.data);
      } catch (error) {
        console.error("Error fetching exams:", error);
        toast.error("Failed to fetch exams");
      }
    };

    fetchExams();
  }, []);

  const handleViewDetails = (examId) => {
    navigate(`/admin/exams/${examId}`);
  };

  return (
    <div className="container mx-auto mr-4">
      <Card>
        <div className="flex justify-end">
          <Link
            className="px-4 py-2 rounded-lg bg-blue-500 text-white"
            to="/admin/createexam"
          >
            Add Exam
          </Link>
        </div>
        <CardContent>
          <h2 className="text-2xl font-semibold mb-4">Exams</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Title</th>
                  <th className="py-3 px-6 text-left">Display</th>
                  <th className="py-3 px-6 text-left">Year</th>
                  <th className="py-3 px-6 text-left">Price</th>
                  <th className="py-3 px-6 text-left">Exam Type</th>
                  <th className="py-3 px-6 text-left">Level</th>
                  <th className="py-3 px-6 text-left">Class Name</th>
                  <th className="py-3 px-6 text-left">Course Name</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {exams.map((exam) => (
                  <tr
                    key={exam.id}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-3 px-6 text-left">{exam.title}</td>
                    <td className="py-3 px-6 text-left">{exam.display}</td>
                    <td className="py-3 px-6 text-left">{exam.year}</td>
                    <td className="py-3 px-6 text-left">${exam.price}</td>
                    <td className="py-3 px-6 text-left">{exam.exam_type}</td>
                    <td className="py-3 px-6 text-left">{exam.level}</td>
                    <td className="py-3 px-6 text-left">{exam.class_name}</td>
                    <td className="py-3 px-6 text-left">{exam.course_name}</td>
                    <td className="py-3 px-6 text-center flex space-x-2">
                      <Button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        onClick={() => handleViewDetails(exam.id)}
                      >
                        View Details
                      </Button>
                      <Button
                        className="bg-green-500 text-white px-4 py-2 rounded-md"
                        onClick={() =>
                          toast.info(`Edit Exam ID: ${exam.id}`)
                        }
                      >
                        Edit
                      </Button>
                      <Button
                        className="bg-red-500 text-white px-4 py-2 rounded-md"
                        onClick={() =>
                          toast.success(`Exam ID: ${exam.id} deleted`)
                        }
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
                {exams.length === 0 && (
                  <tr>
                    <td
                      colSpan="9"
                      className="py-3 px-6 text-center text-gray-500"
                    >
                      No exams found.
                    </td>
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

export default Exams;
