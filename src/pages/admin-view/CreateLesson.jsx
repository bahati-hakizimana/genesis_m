import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";  // Assuming the Button component exists in your project
import { Card, CardContent } from "@/components/ui/Card";  // Assuming the Card components exists in your project

function CreateLesson() {
  const [title, setTitle] = useState("");
  const [display, setDisplay] = useState("");
  const [course, setCourse] = useState("");
  const [classAssigned, setClassAssigned] = useState("");
  const [courses, setCourses] = useState([]);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchCoursesAndClasses = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          throw new Error("Access token is missing. Please log in.");
        }

        // Fetch courses
        const coursesResponse = await axios.get("https://api.genesisonlineschool.rw/api/courses/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCourses(coursesResponse.data);

        // Fetch classes
        const classesResponse = await axios.get("https://api.genesisonlineschool.rw/api/classes/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setClasses(classesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch courses or classes.");
      }
    };

    fetchCoursesAndClasses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !display || !course || !classAssigned) {
      toast.error("All fields are required.");
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        throw new Error("Access token is missing. Please log in.");
      }

      const response = await axios.post(
        "https://api.genesisonlineschool.rw/api/lessons/",
        { title, display, course, class_assigned: classAssigned },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Lesson created successfully!");
      // Reset the form
      setTitle("");
      setDisplay("");
      setCourse("");
      setClassAssigned("");
    } catch (error) {
      console.error("Error creating lesson:", error);
      toast.error("Failed to create lesson.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardContent>
          <h2 className="text-2xl font-semibold mb-4">Create Lesson</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-gray-700">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Lesson title"
              />
            </div>

            {/* Display */}
            <div>
              <label className="block text-gray-700">Display</label>
              <input
                type="text"
                value={display}
                onChange={(e) => setDisplay(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Display name"
              />
            </div>

            {/* Course */}
            <div>
              <label className="block text-gray-700">Course</label>
              <select
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select a course</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Class Assigned */}
            <div>
              <label className="block text-gray-700">Class Assigned</label>
              <select
                value={classAssigned}
                onChange={(e) => setClassAssigned(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select a class</option>
                {classes.map((cls) => (
                  <option key={cls.id} value={cls.id}>
                    {cls.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Create Lesson
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default CreateLesson;
