import React, { useState, useEffect } from "react";
import axios from "axios";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await axios.get("http://localhost:5000/favorites");
        setFavorites(res.data);
      } catch (err) {
        console.error("Error fetching favorites:", err);
      }
    };
    fetchFavorites();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 mt-20 text-center ">❤️ Your Favorite Recipes</h2>
      {favorites.length === 0 ? (
        <p className="text-center text-gray-600"> You haven't added any favorites yet. Go to the <strong>Home</strong> page and like a recipe!
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {favorites.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white p-4 rounded-xl shadow-md border border-gray-200"
            >
              {recipe.image ? (
                <img
                  src={recipe.image}
                  alt={recipe.recipeName}
                  className="w-full h-48 object-cover rounded-lg mb-3"
                />
              ) : (
                <div className="w-full h-48 bg-gray-300 rounded-lg flex items-center justify-center text-gray-600">
                  No Image
                </div>
              )}
              <h3 className="text-lg font-bold text-orange-600">
                {recipe.recipeName}
              </h3>
              <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
              <p><strong>Description:</strong> {recipe.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
