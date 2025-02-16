import React, { useEffect, useState } from "react";
import axios from "axios";
import _ from "lodash"; // For sorting
import { Input } from "@/components/ui/input"; // Ensure you have this component
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [levels, setLevels] = useState([]); // New state for levels
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://197.243.27.49/api/courses/");
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    const fetchLevels = async () => {
      try {
        const response = await axios.get("http://197.243.27.49/api/levels/");
        setLevels(response.data); // Store levels in state
      } catch (error) {
        console.error("Error fetching levels:", error);
      }
    };

    fetchCourses();
    fetchLevels();
  }, []);

  // Handle sorting
  const handleSort = (array, field) => {
    const sortedArray = _.orderBy(array, [field], [sortOrder]);
    return sortedArray;
  };

  // Filtered Courses and Levels
  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredLevels = levels.filter((level) =>
    level.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination Logic for Courses
  const indexOfLastCourse = currentPage * itemsPerPage;
  const indexOfFirstCourse = indexOfLastCourse - itemsPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-6 flex flex-col gap-8">
      <div className="flex justify-end mb-4">
        <Link to="/admin/createcourses" className="px-4 py-1 rounded-lg bg-blue-500 text-white">
          Add course
        </Link>
      </div>

      {/* Courses Table */}
      <Card className="mb-8">
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold mr-4">Courses</h2>
            <Input
              type="text"
              placeholder="Search courses..."
              className="border p-2 rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg mb-6">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">ID</th>
                  <th
                    className="py-3 px-6 text-left cursor-pointer"
                    onClick={() => {
                      setCourses(handleSort(courses, "name"));
                      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                    }}
                  >
                    Name {sortOrder === "asc" ? "🔼" : "🔽"}
                  </th>
                  <th className="py-3 px-6 text-left">Level</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {currentCourses.length > 0 ? (
                  currentCourses.map((course) => (
                    <tr key={course.id} className="border-b border-gray-200 hover:bg-gray-100">
                      <td className="py-3 px-6 text-left">{course.id}</td>
                      <td className="py-3 px-6 text-left">{course.name}</td>
                      <td className="py-3 px-6 text-left">{course.level}</td>
                      <td className="py-3 px-6 text-center flex space-x-2">
                        <Button className="bg-blue-500 text-white px-4 py-2 rounded-md">View</Button>
                        <Button className="bg-green-500 text-white px-4 py-2 rounded-md">Edit</Button>
                        <Button className="bg-red-500 text-white px-4 py-2 rounded-md">Delete</Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4">No courses available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination for Courses */}
          <div className="flex justify-center space-x-2">
            {Array.from({ length: Math.ceil(filteredCourses.length / itemsPerPage) }, (_, index) => (
              <Button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`px-4 py-2 rounded-md ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-800"}`}
              >
                {index + 1}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Levels Table */}
      <Card className="pt-4">
      <div className="flex justify-end mb-4">
        <Link to="/admin/createlevels" className="px-4 py-1 rounded-lg bg-blue-500 text-white">
          Add levels
        </Link>
      </div>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold mr-4">Levels</h2>
            <Input
              type="text"
              placeholder="Search levels..."
              className="border p-2 rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">ID</th>
                  <th
                    className="py-3 px-6 text-left cursor-pointer"
                    onClick={() => {
                      setLevels(handleSort(levels, "name"));
                      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                    }}
                  >
                    Name {sortOrder === "asc" ? "🔼" : "🔽"}
                  </th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {filteredLevels.length > 0 ? (
                  filteredLevels.map((level) => (
                    <tr key={level.id} className="border-b border-gray-200 hover:bg-gray-100">
                      <td className="py-3 px-6 text-left">{level.id}</td>
                      <td className="py-3 px-6 text-left">{level.name}</td>
                      <td className="py-3 px-6 text-center flex space-x-2">
                        <Button className="bg-blue-500 text-white px-4 py-2 rounded-md">Edit</Button>
                        <Button className="bg-red-500 text-white px-4 py-2 rounded-md">Delete</Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center py-4">No levels available</td>
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

export default Courses;
