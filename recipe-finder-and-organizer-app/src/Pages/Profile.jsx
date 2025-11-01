import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { Edit, Trash2, LogOut } from "lucide-react"; // ✅ Added icons
import { useParams } from "react-router-dom";


function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.user.user);
  const [recipes, setRecipes] = useState([]);
  const [recipeName, setRecipeName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [editingRecipe, setEditingRecipe] = useState(null); // ✅ new state for editing


  const { id } = useParams(); // get user ID from URL

// optional: verify correct user loaded
useEffect(() => {
  const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!storedUser || storedUser.id !== parseInt(id)) {
    navigate("/login"); // redirect if user mismatched or not logged in
  }
}, [id, navigate]);


  // ✅ Fetch recipes from db.json
  useEffect(() => {
    axios
      .get("http://localhost:5000/recipes")
      .then((res) => setRecipes(res.data))
      .catch((err) => console.error("Error fetching recipes:", err));
  }, []);

  // ✅ Add / Update recipe
  const handleAddOrUpdateRecipe = async (e) => {
    e.preventDefault();

    const recipeData = {
      recipeName,
      ingredients,
      description,
      image: imagePreview || "",
    };

    try {
      if (editingRecipe) {
        // ✅ Update existing recipe
        const res = await axios.put(
          `http://localhost:5000/recipes/${editingRecipe.id}`,
          recipeData
        );
        setRecipes(
          recipes.map((r) =>
            r.id === editingRecipe.id ? res.data : r
          )
        );
        setEditingRecipe(null);
      } else {
        // ✅ Add new recipe
        const newRecipe = { id: Date.now(), ...recipeData };
        const res = await axios.post(
          "http://localhost:5000/recipes",
          newRecipe
        );
        setRecipes([...recipes, res.data]);
      }

      // ✅ Reset form
      setRecipeName("");
      setIngredients("");
      setDescription("");
      setImage("");
      setImagePreview(null);
    } catch (err) {
      console.error("Error saving recipe:", err);
    }
  };

  // ✅ Edit recipe
  const handleEdit = (recipe) => {
    setEditingRecipe(recipe);
    setRecipeName(recipe.recipeName);
    setIngredients(recipe.ingredients);
    setDescription(recipe.description);
    setImagePreview(recipe.image || null);
    window.scrollTo({ top: 0, behavior: "smooth" }); // scroll up to form
  };

  // ✅ Delete recipe
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/recipes/${id}`);
      setRecipes(recipes.filter((r) => r.id !== id));
    } catch (err) {
      console.error("Error deleting recipe:", err);
    }
  };

  // ✅ Logout
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  // ✅ Image upload (preview)
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setImagePreview(event.target.result);
      reader.readAsDataURL(file);
      setImage(file);
    }
  };

  return (
    <div className="min-h-screen bg-green-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">
          Welcome, {loggedInUser?.name || "User"}!
        </h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>

      {/* User Info */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-8 w-full max-w-md">
        <h2 className="text-xl font-bold mb-3 text-green-700">
          User Details
        </h2>
        <p>
          <strong>User ID:</strong> {loggedInUser?.id}
        </p>
        <p>
          <strong>Name:</strong> {loggedInUser?.name}
        </p>
        <p>
          <strong>Email:</strong> {loggedInUser?.email}
        </p>
      </div>

      {/* Add / Edit Recipe Section */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-10 max-w-xl">
        <h2 className="text-xl font-semibold mb-4 text-green-700">
          {editingRecipe ? "Edit Recipe" : "Add New Recipe"}
        </h2>
        <form onSubmit={handleAddOrUpdateRecipe} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Recipe Name"
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
            className="p-2 border rounded-lg"
            required
          />
          <input
            type="text"
            placeholder="Ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className="p-2 border rounded-lg"
            required
          />
          <textarea
            placeholder="Short Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-2 border rounded-lg"
            required
          ></textarea>

          {/* Image Upload */}
          <div>
            <label className="block mb-2 font-medium text-green-700">
              Upload Image
            </label>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-3 w-32 h-32 object-cover rounded-lg border"
              />
            )}
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600"
          >
            {editingRecipe ? "Update Recipe" : "Add Recipe"}
          </button>
        </form>
      </div>

      {/* Recipes List */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-green-700">
          All Recipes
        </h2>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
          {recipes.map((r) => (
            <div
              key={r.id}
              className="bg-white rounded-lg p-4 shadow-md relative"
            >
              {r.image && (
                <img
                  src={r.image}
                  alt={r.recipeName}
                  className="w-full h-40 object-cover rounded-lg mb-3"
                />
              )}
              <h3 className="text-lg font-bold">{r.recipeName}</h3>
              <p className="text-sm text-gray-700 mt-1">
                <strong>Ingredients:</strong> {r.ingredients}
              </p>
              <p className="text-sm text-gray-600 mt-1">{r.description}</p>

              {/* ✅ Edit & Delete buttons */}
              <div className="flex justify-end gap-3 mt-3">
                <button
                  onClick={() => handleEdit(r)}
                  className="text-blue-500 hover:text-blue-700 flex items-center gap-1"
                >
                  <Edit size={16} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(r.id)}
                  className="text-red-500 hover:text-red-700 flex items-center gap-1"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
