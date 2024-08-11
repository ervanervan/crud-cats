import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddDataPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    thumbnailUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const apiURL = import.meta.env.VITE_APP_BACKEND_URL;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${apiURL}/cats`, formData);
      alert("Data has been added successfully.");
      navigate("/"); // Redirect to homepage after successful addition
    } catch (error) {
      console.error("Error adding data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = () => {
    navigate("/");
  };

  return (
    <section>
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-2xl font-medium mb-6">Add New Data</h1>
        <button onClick={handleClick} className="text-base text-gray-500 mb-4">
          &lt;&lt; back
        </button>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-white p-6 rounded-xl"
        >
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-1.5 focus:border-gray-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="4"
              className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-1.5 focus:border-gray-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label
              htmlFor="thumbnailUrl"
              className="block text-sm font-medium text-gray-700"
            >
              Thumbnail URL:
            </label>
            <input
              type="text"
              id="thumbnailUrl"
              name="thumbnailUrl"
              value={formData.thumbnailUrl}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-1.5 focus:border-gray-500 focus:outline-none"
              required
            />
          </div>
          <div className="flex space-x-3">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:border-blue-500 focus:outline-none"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Data"}
            </button>
            <button
              type="button"
              onClick={handleClick}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:border-gray-500 focus:outline-none"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddDataPage;
