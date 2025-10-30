import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import axios from "axios";


function Login() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
  const fetchRecipes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/recipes");
      setRecipes(res.data);
    } catch (err) {
      console.error("Error fetching recipes:", err);
    }
  };
  fetchRecipes();
}, []);

  

 

  return (
    <div className="  bg-[url('https://i.pinimg.com/1200x/be/c6/6b/bec66b9c4e110e27abf664e9afc7065f.jpg')] bg-fixed bg-cover min-h-screen w-full ">
      <div className="  inset-0 backdrop-blur-sm bg-black/10 flex items-center justify-center flex flex-col items-center justify-center min-h-screen ">
        <div className="flex flex-col gap-5 text-center  mt-35 ">
          <h2 className="text-5xl  mb-1 font-serif  text-wrap ">
            All of your recipes in one place
          </h2>
          <p className="text-xl text-gray-700 mb-5 font-mono">
            A free recipe keeper and meal planner
          </p>
        </div>

        {/* search recipes */}
        <div className="flex justify-center mt-6 mb-8">
          <div className="relative flex items-center group w-full max-w-md">
            <input
              type="text"
              placeholder="Search recipes..."
              className="w-full px-4 py-2 border border-gray-700 rounded-l-xl focus:border-none focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700 placeholder-gray-500 transition-all sm:inline w-32 md:w-48 lg:w-64 xl:w-80 p-2"
            />
            <button
              type="button"
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-r-xl hover:bg-green-700 transition-all group"
            >
              <Search
                size={16}
                className="group-hover:scale-110 transition-transform  "
              />
              <span className="font-medium hidden sm:inline ">Search</span>
            </button>
          </div>
        </div>

        <div className="p-6 min-h-screen flex-wrap">
          <h2 className="text-3xl font-semibold text-center mb-6">
            🍲 Your Delicious Recipes
          </h2>

          {recipes.length === 0 ? (
            <p className="text-center text-gray-500">
              No recipes added yet. Go to <strong>Profile</strong> and add some!
            </p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {recipes.map((recipe, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-4 border border-gray-200 hover:shadow-xl transition-all duration-200"
                >
                  {/* Recipe Image */}
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

                  {/* Recipe Info */}
                  <h3 className="text-xl font-bold mb-2 text-orange-600">
                    {recipe.recipeName}
                  </h3>
                  <p className="text-gray-700 mb-2">
                    <strong>Ingredients:</strong> {recipe.ingredients}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Description:</strong> {recipe.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
