import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function CreateCourse() {
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const [levels, setLevels] = useState([]);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchLevels = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          throw new Error("Access token is missing. Please log in.");
        }

        const response = await axios.get("http://197.243.27.49/api/levels/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setLevels(response.data);
      } catch (error) {
        console.error("Error fetching levels:", error);
        toast.error("Failed to fetch levels.");
      }
    };

    fetchLevels();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !level) {
      toast.error("All fields are required.");
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        throw new Error("Access token is missing. Please log in.");
      }

      await axios.post(
        "http://197.243.27.49/api/courses/",
        { name, level },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Course created successfully!");
      setName("");
      setLevel("");

      // Redirect to /admin with a success message
      navigate("/admin", { state: { message: "Course created successfully!" } });

    } catch (error) {
      console.error("Error creating course:", error);
      toast.error("Failed to create course.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardContent>
          <h2 className="text-2xl font-semibold mb-4">Create Course</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Course Name */}
            <div>
              <label className="block text-gray-700">Course Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter course name"
              />
            </div>

            {/* Level */}
            <div>
              <label className="block text-gray-700">Select Level</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select a level</option>
                {levels.map((lvl) => (
                  <option key={lvl.id} value={lvl.id}>
                    {lvl.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Create Course
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default CreateCourse;
