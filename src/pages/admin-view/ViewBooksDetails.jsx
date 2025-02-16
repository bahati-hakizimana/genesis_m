import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import biology from "../../assets/biologyy.jpg";
import { Button } from "@/components/ui/button";  // Assuming the Button component exists
import { Card, CardContent } from "@/components/ui/Card";  // Assuming the Card component exists

function ViewBooksDetails() {
  const { id } = useParams();  // Get the book ID from the URL
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          throw new Error("Access token is missing. Please log in.");
        }

        const response = await axios.get(`https://api.genesisonlineschool.rw/api/books/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (!book) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <Card className="max-w-4xl mx-auto shadow-lg rounded-lg bg-white">
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <div className="md:w-2/3">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">{book.title}</h2>
              <p className="text-xl text-gray-600 mb-2">Author: <span className="font-semibold">{book.author}</span></p>
              <p className="text-lg text-gray-600 mb-2">Level: <span className="font-semibold">{book.level}</span></p>
              <p className="text-lg text-gray-600 mb-2">Class Name: <span className="font-semibold">{book.class_name}</span></p>
              <p className="text-lg text-gray-600 mb-2">Published: <span className="font-semibold">{book.publication_date}</span></p>
              <p className="text-lg text-gray-600 mb-2">Price: <span className="font-semibold">${book.price}</span></p>
              <p className="text-lg text-gray-600 mb-2">Lesson: <span className="font-semibold">{book.lesson}</span></p>
              <p className="text-lg text-gray-600 mb-4">Total Pages: <span className="font-semibold">{book.total_pages}</span></p>
              <p className="text-lg text-gray-600 mb-4">Created by: <span className="font-semibold">{book.created_by}</span></p>
            </div>

            {/* PDF Thumbnail */}
            <div className="md:w-1/3 mb-4 md:mb-0">
              <h3 className="text-2xl font-semibold mb-2 text-gray-800">PDF Document:</h3>
              <div
                className="cursor-pointer hover:opacity-80 transition-all ease-in-out"
                onClick={() => window.open(book.pdf_document, "_blank")}  // Open PDF in a new tab
              >
                <img
                  src={biology}  // Placeholder image, replace with your PDF thumbnail image
                  alt="PDF Thumbnail"
                  className="w-full h-72 object-cover rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>

          {/* Button */}
          <div className="text-center">
            <Button
              className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all"
              onClick={() => window.open(book.pdf_document, "_blank")}  // Open PDF in a new tab
            >
              Read PDF
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ViewBooksDetails;
