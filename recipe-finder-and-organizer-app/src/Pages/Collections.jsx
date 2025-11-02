import React, { useState } from "react";
import { collectionsData } from "../redux/CollectionsData.jsx";

function Collections() {
  // Track how many recipes to show per section
  const [visibleCount, setVisibleCount] = useState({
    breakfast: 4,
    lunch: 4,
    eveningSnacks: 4,
    dinner: 4,
  });

  // Toggle between show more and show less
  const handleToggle = (mealType, totalRecipes) => {
    setVisibleCount((prev) => ({
      ...prev,
      [mealType]: prev[mealType] === 4 ? totalRecipes : 4,
    }));
  };

  return (
    <div className="p-6 mt-20">
      <h1 className="text-4xl font-extrabold text-center mb-3 text-green-500">
        Discover Delicious Collections
      </h1>
      <p className="text-center text-gray-600 mb-10">
        Explore recipes curated for every time of the day — breakfast, lunch,
        snacks, and dinner!
      </p>

      {Object.entries(collectionsData).map(([mealType, recipes]) => (
        <div key={mealType} className="mb-10">
          <h2 className="text-3xl font-bold capitalize mb-6 text-gray-800 text-green-500">
            {mealType.replace(/([A-Z])/g, " $1")}
          </h2>

          {/* Recipe Grid */}
          <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6 ">
            {recipes.slice(0, visibleCount[mealType]).map((recipe, index) => (
              <div
                key={index}
                className=" border rounded-xl shadow-md bg-white hover:shadow-lg transition-all hover:shadow-lg focus:outline-green-400 border hover:border-green-500  "
              >
                <div className="overflow-hidden rounded-lg">
                  <img
                    src={recipe.image}
                    alt={recipe.recipeName}
                    className="w-full h-48 object-cover rounded-lg transition-transform duration-300 hover:scale-110"
                  />
                </div>

                <h3 className=" px-4 font-semibold text-lg hover:text-green-600 mt-3 text-gray-900">
                  {recipe.recipeName}
                </h3>
                <p className=" px-4 text-sm text-gray-600 mb-2">
                  ⏱ {recipe.prepTime}
                </p>
                <p className=" px-4 text-gray-700 text-sm">
                  <strong>Ingredients:</strong> {recipe.ingredients.join(", ")}
                </p>
                <p className=" px-4 pb-2 mt-2 text-gray-700 text-sm">
                  {recipe.description}
                </p>
              </div>
            ))}
          </div>

          {/* Load More / Show Less Button */}
          <div className="text-center mt-6">
            <button
              onClick={() => handleToggle(mealType, recipes.length)}
              className="px-5 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
            >
              {visibleCount[mealType] === 4 ? "Load More" : "Show Less"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Collections;
