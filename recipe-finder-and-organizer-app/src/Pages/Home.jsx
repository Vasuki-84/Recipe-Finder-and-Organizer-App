import { useNavigate } from "react-router-dom";
import { Search, Heart } from "lucide-react";
import React, { useEffect, useState } from "react";
import axios from "axios";

function Login() {
  const [recipes, setRecipes] = useState([]);
  const [likedRecipes, setLikedRecipes] = useState({});

  // fetch all the recipes
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

  // Fetch all favorites on page load
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await axios.get("http://localhost:5000/favorites");
        // create a map { [id]: true } for liked status
        const likedMap = {};
        res.data.forEach((fav) => {
          likedMap[fav.id] = true;
        });
        setLikedRecipes(likedMap);
      } catch (err) {
        console.error("Error fetching favorites:", err);
      }
    };
    fetchFavorites();
  }, []);

  // toggle like / unlike
  const toggleLike = async (id) => {
    const selectedRecipe = recipes.find((r) => r.id === id);

    setLikedRecipes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));

    try {
      if (!likedRecipes[id]) {
        //  If user just liked the recipe — add to favorites
        await axios.post("http://localhost:5000/favorites", selectedRecipe);
        console.log("Added to favorites:", selectedRecipe);
      } else {
        //  If user unliked — remove from favorites
        const res = await axios.get(`http://localhost:5000/favorites`);
        const favoriteToRemove = res.data.find((fav) => fav.id === id);

        if (favoriteToRemove) {
          await axios.delete(
            `http://localhost:5000/favorites/${favoriteToRemove.id}`
          );
          console.log("Removed from favorites:", favoriteToRemove);
        }
      }
    } catch (err) {
      console.error("Error updating favorites:", err);
    }
  };

  return (
    <div className="   ">
      {/* herosection */}
      <div className="bg-[url('https://i.pinimg.com/736x/55/c0/42/55c042e35195a82c9cc630c1d135cb7c.jpg')] w-full bg-cover min-h-screen  bg-fixed bg-center  md:bg-cover bg-no-repeat ...">
        <div className="  inset-0 backdrop-blur-sm bg-black/10 flex items-center justify-center flex flex-col items-center justify-center min-h-screen ">
          <div className=" bg-green-600 shadow-lg px-10 py-20 text-left rounded-lg   ">
            <h2 className="text-6xl font-bold  mb-1  text-white text-wrap text-shadow-lg/20 ...  ">
              Recipes Right <br /> for Your Family
            </h2>
            <p className="text-xl text-gray-100 mb-5 mt-2  font-mono">
              Have a picky eater? Short on time? Sort recipes <br /> by
              kid-friendly, prep time and more.
            </p>
          </div>
        </div>
      </div>

      {/* search recipes */}
      <div className="bg-green-100  ">
        <div className="flex justify-center flex-col items-center    mb-8 ">
          <div className="mb-4 text-4xl font-bold  mt-4 text-center">
            {" "}
            <h2>Find Recipes </h2>
            <p className="text-sm font-sans text-gray-700">
              Use filters to find meals and snacks that fit your preferences.
            </p>
          </div>

          <div className="relative flex items-center group w-full max-w-md ">
            <input
              type="text"
              placeholder="Search recipes..."
              className="w-full px-4 py-2 border border-gray-700 rounded-l-xl focus:border-none focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700 placeholder-gray-500 transition-all sm:inline w-32 md:w-48 lg:w-64 xl:w-80 p-2"
            />
            <button
              type="button"
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-r-lg hover:bg-green-700 transition-all group"
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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto ">
              {recipes.map((recipe, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-4 border border-gray-200  hover:shadow-2xl hover:border-solid hover:border-3 hover:border-green-500  focus:outline-green-500    transition-all duration-200 "
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
                  <div
                    key={index}
                    className=" rounded-xl p-4  transition-all duration-200 relative"
                  >
                    {/* Like Button */}
                    <button
                      onClick={() => toggleLike(recipe.id)}
                      className="absolute top-2 right-1 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Heart
                        size={22}
                        fill={likedRecipes[recipe.id] ? "red" : "none"}
                        stroke={
                          likedRecipes[recipe.id] ? "red" : "currentColor"
                        }
                      />
                    </button>
                  </div>
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
