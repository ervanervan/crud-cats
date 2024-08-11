import axios from "axios";
import React, { useEffect, useState } from "react";
import CardDetail from "../components/CardDetail";
import { useNavigate, useParams } from "react-router-dom";

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [oneData, setOneData] = useState(null); // Inisialisasi dengan null untuk memudahkan pengecekan
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    thumbnailUrl: "",
  });
  const apiURL = import.meta.env.VITE_APP_BACKEND_URL;

  useEffect(() => {
    async function fetchOneData() {
      try {
        // console.log(`Fetching data for id: ${id}`); // Tambahkan log untuk memeriksa id yang dipakai
        const response = await axios.get(`${apiURL}/cats/${id}`);
        // console.log("Response data:", response.data); // Tambahkan log untuk memeriksa data dari API
        setOneData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchOneData();
  }, [id, apiURL]);

  useEffect(() => {
    if (oneData) {
      setFormData(oneData); // Update formData when oneData changes
    }
  }, [oneData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      await axios.put(`${apiURL}/cats/${id}`, formData);
      setOneData(formData); // Update oneData with new data
      setIsEditing(false); // Exit edit mode
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleCancel = () => {
    setFormData(oneData); // Reset formData to original data
    setIsEditing(false); // Exit edit mode
  };

  const handleClick = () => {
    navigate("/");
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await axios.delete(`${apiURL}/cats/${id}`);
        alert("Data has been deleted successfully.");
        navigate("/"); // Redirect to home or another page after deletion
      } catch (error) {
        console.error("Error deleting data:", error);
      }
    }
  };

  if (loading)
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  if (!oneData) return <p>No data found</p>; // Handle case ketika data tidak ditemukan

  return (
    <section>
      <div className="container mx-auto px-4 py-10">
        {isEditing ? (
          <div>
            <h1 className="text-2xl font-semibold mb-2 text-gray-800">
              Edit Data
            </h1>
            <button
              onClick={handleCancel}
              className="text-base text-gray-500 mb-4"
            >
              &lt;&lt; back
            </button>
            <form className="space-y-4 bg-white p-6 rounded-xl">
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
                />
              </div>
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={handleSave}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:border-blue-500 focus:outline-none"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:border-gray-500 focus:outline-none"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-medium mb-2">Detail Data</h1>
            <button
              onClick={handleClick}
              className="text-base text-gray-500 mb-4"
            >
              &lt;&lt; back
            </button>
            <CardDetail
              thumbnailUrl={oneData.thumbnailUrl}
              title={oneData.title}
              description={oneData.description}
              isEditing={isEditing}
              formData={formData}
              handleInputChange={handleInputChange}
              handleSave={handleSave}
              handleCancel={handleCancel}
            />
            <div className="flex space-x-3 mt-4">
              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center px-5 py-2 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:border-green-500 focus:outline-none transition-all duration-300"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="inline-flex items-center px-5 py-2 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:border-red-500 focus:outline-none transition-all duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DetailPage;
