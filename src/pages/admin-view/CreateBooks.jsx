import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button"; // Assuming the Button component exists
import { Card, CardContent } from "@/components/ui/card"; // Assuming the Card component exists
import { useNavigate } from "react-router-dom";

function CreateBooks() {
  const [bookData, setBookData] = useState({
    title: "",
    lesson: "",
    pdf_document: null,
    author: "",
    price: "",
    publication_date: "",
  });

  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch lessons from the API
  useEffect(() => {
    axios
      .get("http://197.243.27.49/api/lessons/")
      .then((response) => {
        setLessons(response.data);
      })
      .catch((error) => {
        toast.error("Failed to fetch lessons");
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
  };

  const handleFileChange = (e) => {
    setBookData({ ...bookData, pdf_document: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Get logged-in user's ID from local storage
    const userId = localStorage.getItem("userId");

    const formData = new FormData();
    formData.append("title", bookData.title);
    formData.append("lesson", bookData.lesson);
    formData.append("pdf_document", bookData.pdf_document);
    formData.append("author", bookData.author);
    formData.append("price", bookData.price);
    formData.append("publication_date", bookData.publication_date);
    formData.append("created_by", userId); // Use the logged-in user's ID

    try {
      const response = await axios.post("http://197.243.27.49/api/books/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (response.status === 201) {
        toast.success("Book created successfully!");
        setBookData({
          title: "",
          lesson: "",
          pdf_document: null,
          author: "",
          price: "",
          publication_date: "",
        });
        navigate("/admin/books"); // Redirect to /books page after success
      } else {
        toast.error("Failed to create book. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to create book. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardContent>
          <h2 className="text-2xl font-semibold mb-4">Create Book</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  name="title"
                  value={bookData.title}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Lesson</label>
                <select
                  name="lesson"
                  value={bookData.lesson}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select a lesson</option>
                  {lessons.map((lesson) => (
                    <option key={lesson.id} value={lesson.id}>
                      {lesson.display}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">PDF Document</label>
                <input
                  type="file"
                  name="pdf_document"
                  onChange={handleFileChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  required
                />
                <div className="mt-2">
                  <Button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                    Upload PDF
                  </Button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Author</label>
                <input
                  type="text"
                  name="author"
                  value={bookData.author}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input
                  type="number"
                  name="price"
                  value={bookData.price}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Publication Date</label>
                <input
                  type="date"
                  name="publication_date"
                  value={bookData.publication_date}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="mt-4">
                <button
                  type="submit"
                  className="bg-cyan-400 text-white font-bold py-3 rounded-xl w-full"
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Create Book"}
                </button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default CreateBooks;
