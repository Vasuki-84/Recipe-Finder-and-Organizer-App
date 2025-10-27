import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [recipes, setRecipes] = useState([]);
  const [recipeName, setRecipeName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  // Load recipes from localStorage on component mount
  useEffect(() => {
    const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
    setRecipes(storedRecipes);
  }, []);

  // Save recipes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(recipes));
  }, [recipes]);

  // Handle image upload and convert to base64 string
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  // Add or update recipe
  const handleAddOrUpdate = (e) => {
    e.preventDefault();

    const newRecipe = { recipeName, ingredients, description, image };

    if (editIndex !== null) {
      // Update existing recipe
      const updatedRecipes = [...recipes];
      updatedRecipes[editIndex] = newRecipe;
      setRecipes(updatedRecipes);
      setEditIndex(null);
    } else {
      // Add new recipe
      setRecipes([...recipes, newRecipe]);
    }

    // Clear form
    setRecipeName("");
    setIngredients("");
    setDescription("");
    setImage(null);
  };

  // Edit recipe
  const handleEdit = (index) => {
    const recipeToEdit = recipes[index];
    setRecipeName(recipeToEdit.recipeName);
    setIngredients(recipeToEdit.ingredients);
    setDescription(recipeToEdit.description);
    setImage(recipeToEdit.image);
    setEditIndex(index);
  };

  // Delete recipe
  const handleDelete = (index) => {
    const updatedRecipes = recipes.filter((_, i) => i !== index);
    setRecipes(updatedRecipes);
  };

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser"); // Clear session
    navigate("/"); // Redirect to home page
  };

  return (
    <div className="p-6 min-h-screen bg-gray-200 mt-15 bg-[url('https://i.pinimg.com/1200x/be/c6/6b/bec66b9c4e110e27abf664e9afc7065f.jpg')] bg-fixed bg-cover min-h-screen w-ful">
      {/* User Info Section */}
      <div className="bg-white shadow-lg rounded-2xl p-6 text-center mb-6 max-w-md mx-auto">
        <h2 className="text-2xl font-semibold mb-2 text-orange-600">
          👋 Welcome, {user?.name || "Guest"}
        </h2>
        <p className="text-gray-700 mb-1">
          <strong>Email:</strong> {user?.email}
        </p>
        <p className="text-gray-700 mb-3">
          <strong>User ID:</strong> {user?.id || "N/A"}
        </p>
        <p className="text-gray-500">
          You can add, edit, and manage your recipes below 🍳
        </p>
      </div>

      <h2 className="font-semibold text-3xl text-center mb-6 mt-6">
        Turn your kitchen experiments into recipes — add now 🍽️
      </h2>

      <form
        onSubmit={handleAddOrUpdate}
        className="bg-white p-4 rounded-2xl max-w-md mx-auto shadow-2xl"
      >
        <h2 className="font-semibold text-2xl text-center mb-6">
          {editIndex !== null ? "Edit Recipe" : "Add Your Recipe"}
        </h2>

        <label>Recipe Name</label>
        <input
          value={recipeName}
          onChange={(e) => setRecipeName(e.target.value)}
          className="border-b rounded w-full mb-3 border-gray-500 px-2 py-2 focus:outline-orange-400"
          type="text"
          required
        />

        <label>Ingredients</label>
        <textarea
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          className="border-b rounded w-full mb-3 border-gray-500 px-2 py-2 focus:outline-orange-400 h-23"
          required
        ></textarea>

        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border-b rounded w-full mb-3 border-gray-500 px-2 py-2 focus:outline-orange-400 h-23"
          required
        ></textarea>

        <label>Upload Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full mb-3 text-sm text-gray-600"
        />

        {image && (
          <img
            src={image}
            alt="Recipe preview"
            className="w-full h-48 object-cover rounded-lg mb-3"
          />
        )}

        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white p-2 mt-3 rounded-lg transition-all"
        >
          {editIndex !== null ? "Update Recipe" : "Add Recipe"}
        </button>
      </form>

      {/* Recipe List */}
      <div className="max-w-md mx-auto mt-8">
        <h3 className="text-xl font-semibold mb-3 text-center">Your Recipes</h3>
        {recipes.length === 0 ? (
          <p className="text-center text-gray-500">No recipes added yet.</p>
        ) : (
          recipes.map((recipe, index) => (
            <div
              key={index}
              className="bg-white p-4 mb-4 rounded-lg shadow-md border border-gray-300"
            >
              {recipe.image && (
                <img
                  src={recipe.image}
                  alt={recipe.recipeName}
                  className="w-full h-48 object-cover rounded-lg mb-2"
                />
              )}
              <h4 className="text-lg font-bold mb-1">{recipe.recipeName}</h4>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Ingredients:</strong> {recipe.ingredients}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Description:</strong> {recipe.description}
              </p>

              <div className="flex justify-between">
                <button
                  onClick={() => handleEdit(index)}
                  className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Logout  */}
      <div className="flex flex-col items-center justify-center ">
        <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
          <h2 className="text-2xl font-semibold mb-4">
            Welcome, {user?.name || "Guest"} 👋
          </h2>
          <p className="text-gray-600 mb-6">
            You can add, edit, or delete your recipes here.
          </p>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-lg transition-all"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
