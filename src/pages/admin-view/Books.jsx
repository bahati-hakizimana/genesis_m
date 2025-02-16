import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";  // Assuming the Button component exists in your project
import { Card, CardContent } from "@/components/ui/Card";  // Assuming the Card components exists in your project

function Books() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          throw new Error("Access token is missing. Please log in.");
        }

        const response = await axios.get("https://api.genesisonlineschool.rw/api/books/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
        toast.error("Failed to fetch books");
      }
    };

    fetchBooks();
  }, []);

  const handleViewDetails = (bookId) => {
    navigate(`/admin/books/${bookId}`);
  };
  

  return (
    <div className="container mx-auto p-6">
      <Card>
        <div className=" flex justify-end">
          <Link className=" px-4 py-2 rounded-lg bg-blue-500 text-white" to="/admin/createbook">AddBooks</Link>
        </div>
        <CardContent>
          <h2 className="text-2xl font-semibold mb-4">Books</h2>
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
                {books.map((book) => (
                  <tr key={book.id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left">{book.title}</td>
                    <td className="py-3 px-6 text-left">{book.lesson.title}</td>
                    <td className="py-3 px-6 text-left">${book.price}</td>
                    <td className="py-3 px-6 text-left">{book.level}</td>
                    <td className="py-3 px-6 text-left">{book.class_name}</td>
                    <td className="py-3 px-6 text-center flex space-x-2">
                      <Button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        onClick={() => handleViewDetails(book.id)}
                      >
                        View Details
                      </Button>
                      <Button
                        className="bg-green-500 text-white px-4 py-2 rounded-md"
                        onClick={() => toast.info(`Edit Book ID: ${book.id}`)}
                      >
                        Edit
                      </Button>
                      <Button
                        className="bg-red-500 text-white px-4 py-2 rounded-md"
                        onClick={() => toast.success(`Book ID: ${book.id} deleted`)}
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

export default Books;
