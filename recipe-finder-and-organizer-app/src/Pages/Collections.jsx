import React, { useEffect, useState } from "react";
import axios from "axios";

function Collections() {
  const [collections, setCollections] = useState([]);
  const [filteredCollections, setFilteredCollections] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");

  // Fetch data from db.json
  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const res = await axios.get("http://localhost:5000/collections");
        setCollections(res.data);
        setFilteredCollections(res.data);
      } catch (err) {
        console.error("Error fetching collections:", err);
      }
    };
    fetchCollections();
  }, []);

  // Filter and search logic
  useEffect(() => {
    let filtered = collections;

    if (category !== "All") {
      filtered = filtered.filter(
        (item) => item.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredCollections(filtered);
  }, [searchTerm, category, collections]);

  return (
    <div className="min-h-screen bg-green-50 py-24 px-6">
      <h1 className="text-4xl font-bold text-center text-green-700 mb-8">
        🍴 Our Collections
      </h1>

      {/* Search & Filter Controls */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-10">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search your favorite recipe..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        {/* Category Filter */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-60 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="All">All</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Evening Snacks">Evening Snacks</option>
          <option value="Dinner">Dinner</option>
        </select>
      </div>

      {/* Collections Grid */}
      {filteredCollections.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {filteredCollections.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-100 hover:shadow-lg hover:border-solid hover:border-3 hover:border-green-500  focus:outline-green-500    transition"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-5">
                <h2 className="text-xl font-semibold text-green-700">
                  {item.title}
                </h2>
                     <p className="text-gray-600 mt-2 text-sm line-clamp-2">
                  <strong>Ingredients: </strong>{item.ingredients}
                </p>
                <p className="text-gray-600 mt-2 text-sm line-clamp-2">
                  <strong>Description: </strong>
                  {item.description}
                </p>
                <div className="mt-3">
                  <span className="inline-block bg-green-100 text-green-700 px-3 py-1 text-xs rounded-full">
                    {item.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10 text-lg">
          No recipes found.
        </p>
      )}
    </div>
  );
}

export default Collections;
