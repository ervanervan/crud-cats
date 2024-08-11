import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardData from "../components/CardData";
import axios from "axios";

const HomePage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiURL = import.meta.env.VITE_APP_BACKEND_URL;
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAllData() {
      try {
        const response = await axios.get(`${apiURL}/cats`);
        // console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchAllData();
  }, [apiURL]);

  const handleCardClick = (_id) => {
    console.log("Clicked item id:", _id);
    navigate(`/detail/${_id}`);
  };

  const handleAddDataClick = () => {
    navigate("/add");
  };

  if (loading)
    return (
      <>
        <div className="h-screen w-full flex items-center justify-center">
          <p>Loading...</p>
        </div>
      </>
    );

  return (
    <section>
      <div className="container mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-2xl font-medium">Data Kucing</h1>
          <button
            onClick={handleAddDataClick}
            className="px-4 py-3 rounded-lg bg-gray-50 hover:bg-gray-100 text-black transition-all duration-300"
          >
            &#43; Add data
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-5 items-start">
          {data?.map((item, key) => (
            <CardData
              key={key}
              thumbnailUrl={item.thumbnailUrl}
              title={item.title}
              description={item.description}
              onClick={() => handleCardClick(item._id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomePage;
