import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import axios from "axios";

function Profile() {
  const { id } = useParams(); // ✅ Get user ID from URL
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Local states
  const [recipes, setRecipes] = useState([]);
  const [recipeName, setRecipeName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [profileUser, setProfileUser] = useState(null);

  // ✅ Fetch user details by ID
  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/${id}`)
      .then((res) => setProfileUser(res.data))
      .catch((err) => console.error("Error loading user:", err));
  }, [id]);

  // ✅ Fetch recipes for this specific user
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get("http://localhost:5000/recipes");
        const userRecipes = res.data.filter((r) => r.userId === Number(id));
        setRecipes(userRecipes);
      } catch (err) {
        console.error("Error fetching recipes:", err);
      }
    };
    fetchRecipes();
  }, [id]);

  // ✅ Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setError("Please select an image file.");
      return;
    }
    if (!file.type.startsWith("image/")) {
      setError("Only image files are allowed.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setError("Image must be less than 2MB.");
      return;
    }

    setError("");
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // ✅ Add or Update Recipe
  const handleAddOrUpdate = async (e) => {
    e.preventDefault();

    if (!recipeName || !ingredients || !description) {
      setError("Please fill all fields");
      return;
    }

    const newRecipe = {
      recipeName,
      ingredients,
      description,
      image,
      userId: Number(id),
    };

    try {
      if (editIndex !== null) {
        // Update existing recipe
        const recipeId = recipes[editIndex].id;
        const res = await axios.put(
          `http://localhost:5000/recipes/${recipeId}`,
          newRecipe
        );

        const updatedRecipes = [...recipes];
        updatedRecipes[editIndex] = res.data;
        setRecipes(updatedRecipes);
        setMessage("Recipe updated successfully!");
        setEditIndex(null);
      } else {
        // Add new recipe
        const res = await axios.post(
          "http://localhost:5000/recipes",
          newRecipe
        );
        setRecipes([...recipes, res.data]);
        setMessage("Recipe added successfully!");
      }

      // Clear form
      setRecipeName("");
      setIngredients("");
      setDescription("");
      setImage(null);
      setError("");
    } catch (err) {
      console.error("Error adding/updating recipe:", err);
      setError("Failed to save recipe");
    }
  };

  // ✅ Edit Recipe
  const handleEdit = (index) => {
    const recipeToEdit = recipes[index];
    setRecipeName(recipeToEdit.recipeName);
    setIngredients(recipeToEdit.ingredients);
    setDescription(recipeToEdit.description);
    setImage(recipeToEdit.image);
    setEditIndex(index);
  };

  // ✅ Delete Recipe
  const handleDelete = async (index) => {
    const recipeId = recipes[index].id;
    try {
      await axios.delete(`http://localhost:5000/recipes/${recipeId}`);
      const updatedRecipes = recipes.filter((_, i) => i !== index);
      setRecipes(updatedRecipes);
    } catch (err) {
      console.error("Error deleting recipe:", err);
    }
  };

  // ✅ Logout
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // ✅ Show loading until user data is fetched
  if (!profileUser) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Loading user profile...
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-gray-200 mt-10">
      {/* User Info Section */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white shadow-lg rounded-2xl p-6 text-center mb-6 max-w-md mx-auto mt-20">
          <h2 className="text-2xl font-semibold mb-2 text-orange-600">
            👋 Welcome, {profileUser?.name || "Guest"}
          </h2>
          <p className="text-gray-700 mb-1">
            <strong>Email:</strong> {profileUser?.email}
          </p>
          <p className="text-gray-700 mb-3">
            <strong>User ID:</strong> {profileUser?.id || "N/A"}
          </p>
          <p className="text-gray-500">
            You can add, edit, and manage your recipes below 🍳
          </p>
          <div className="flex flex-row gap-1 justify-center">
            <p className="text-gray-600 mb-4">Are you sure you want to</p>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white py-1 px-2 mt-2 rounded-lg transition-all"
            >
              Log Out
            </button>
          </div>
        </div>

        {/* Recipe Form */}
        <div>
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
              className="border-b rounded w-full mb-3 border-gray-500 px-2 py-2 focus:outline-orange-400"
              required
            ></textarea>

            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border-b rounded w-full mb-3 border-gray-500 px-2 py-2 focus:outline-orange-400"
              required
            ></textarea>

            <label>Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full mb-3 text-sm text-gray-600 border px-2"
            />

            {image && (
              <img
                src={image}
                alt="Recipe preview"
                className="w-full h-48 object-cover rounded-lg mb-3"
              />
            )}

            {error && <p className="text-red-500">{error}</p>}
            {message && <p className="text-green-600">{message}</p>}

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white p-2 mt-3 rounded-lg transition-all"
            >
              {editIndex !== null ? "Update Recipe" : "Add Recipe"}
            </button>
          </form>
        </div>
      </div>

      {/* Recipe List */}
      <div className="max-w-md mx-auto mt-8">
        <h3 className="text-xl font-semibold mb-3 text-center">Your Recipes</h3>
        {recipes.length === 0 ? (
          <p className="text-center text-gray-500">No recipes added yet.</p>
        ) : (
          recipes.map((recipe, index) => (
            <div
              key={recipe.id || index}
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
    </div>
  );
}

export default Profile;
