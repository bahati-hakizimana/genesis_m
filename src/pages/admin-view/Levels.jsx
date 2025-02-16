import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/Card";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function Levels() {
  const [name, setName] = useState("");
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        throw new Error("Access token is missing. Please log in.");
      }

      await axios.post(
        "https://api.genesisonlineschool.rw/api/levels/",
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Course created successfully!");
      setName("");

      // Redirect to /admin with a success message
      navigate("/admin", { state: { message: "Level created successfully!" } });

    } catch (error) {
      console.error("Error creating course:", error);
      toast.error("Failed to create course.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardContent>
          <h2 className="text-2xl font-semibold mb-4">Create Level</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Course Name */}
            <div>
              <label className="block text-gray-700">Level Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter course name"
              />
            </div>


            {/* Submit Button */}
            <Button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Create Level
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Levels
