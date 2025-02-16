import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";  // Assuming the Button component exists in your project
import { Card, CardContent } from "@/components/ui/Card";  // Assuming the Card components exists in your project

function LectureNotes() {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get("https://api.genesisonlineschool.rw/api/notes");
        setNotes(response.data);
      } catch (error) {
        console.error("Error fetching notes:", error);
        toast.error("Failed to fetch notes");
      }
    };

    fetchNotes();
  }, []);

  const handleViewDetails = (noteId) => {
    navigate(`/admin/notes/${noteId}`);
  };

  return (
    <div className="container mx-auto p-6">
      <Card>
        <div className="flex justify-end mb-4">
          <Link className="px-4 py-2 rounded-lg bg-blue-500 text-white" to="/admin/createnotes">Add Note</Link>
        </div>
        <CardContent>
          <h2 className="text-2xl font-semibold mb-4">Lecture Notes</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Title</th>
                  <th className="py-3 px-6 text-left">Lesson</th>
                  <th className="py-3 px-6 text-left">Price</th>
                  <th className="py-3 px-6 text-left">Level</th>
                  <th className="py-3 px-6 text-left">Class Name</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {notes.map((note) => (
                  <tr key={note.id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left">{note.title}</td>
                    <td className="py-3 px-6 text-left">{note.lesson.title}</td>
                    <td className="py-3 px-6 text-left">${note.price}</td>
                    <td className="py-3 px-6 text-left">{note.level}</td>
                    <td className="py-3 px-6 text-left">{note.class_name}</td>
                    <td className="py-3 px-6 text-center flex space-x-2">
                      <Button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        onClick={() => handleViewDetails(note.id)}
                      >
                        View Details
                      </Button>
                      <Button
                        className="bg-green-500 text-white px-4 py-2 rounded-md"
                        onClick={() => toast.info(`Edit Note ID: ${note.id}`)}
                      >
                        Edit
                      </Button>
                      <Button
                        className="bg-red-500 text-white px-4 py-2 rounded-md"
                        onClick={() => toast.success(`Note ID: ${note.id} deleted`)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default LectureNotes;
