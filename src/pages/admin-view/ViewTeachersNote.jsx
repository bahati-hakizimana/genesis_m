import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ViewTeachersNote() {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNoteDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/notes/${id}/`);
        setNote(response.data);
      } catch (error) {
        console.error("Error fetching note details:", error);
        toast.error("Failed to fetch note details");
      } finally {
        setLoading(false);
      }
    };

    fetchNoteDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <p className="text-xl text-gray-700 animate-pulse">Loading note details...</p>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <p className="text-xl text-gray-700">Note not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 w-full p-6">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-green-600 p-6 text-white text-center">
          <h1 className="text-3xl font-bold">{note.title}</h1>
          <p className="text-lg text-green-200 mt-1">Lesson {note.lesson}</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500 font-medium uppercase">Price</p>
              <p className="text-lg text-gray-900 font-semibold">${note.price}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium uppercase">Created By</p>
              <p className="text-lg text-gray-900 font-semibold">User {note.created_by}</p>
            </div>
          </div>
          <div className="mt-6">
            <p className="text-sm text-gray-500 font-medium uppercase mb-2">Content</p>
            <div className="p-4 border border-gray-300 rounded bg-gray-100 text-gray-900 text-lg leading-relaxed">
              {note.content}
            </div>
          </div>
          <div className="mt-6">
            <p className="text-sm text-gray-500 font-medium uppercase mb-2">Video</p>
            <video controls className="w-full rounded-lg shadow-lg">
              <source src={note.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewTeachersNote;

