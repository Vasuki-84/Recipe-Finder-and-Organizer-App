import React, { useState } from "react";
import { CookingPot } from "lucide-react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleCreateAccount = () => {
    navigate("/CustomCreations");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all fields.");
      setMessage("");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      setMessage("");
      return;
    }

    if (!formData.termsAccepted) {
      setError("You must accept the Terms and Conditions.");
      setMessage("");

      return;
    }

    try {
      await axios.post("http://localhost:5000/users", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      setMessage("Signup successful!");

      setError("");
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        termsAccepted: false,
      });
      handleCreateAccount();
    } catch (err) {
      console.error("Error saving user:", err);
      setError("Error occurred while signing up.");
      setMessage("");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md mt-23 mb-5 mx-auto ">
        <div className="flex flex-col items-center mb-4">
          <div className="text-green-600 mb-2 ">
            {" "}
            <CookingPot size={30} />
          </div>
          <h2 className="font-semibold text-3xl  ">Welcome!</h2>
          <p className="text-sm m mt-2 text-gray-600 ">
            We need a few details to create your account.
            <br />
            After this, you'll be set up and ready to go.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 ">
          {/* Name */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full border-b-2 border-gray-300 px-3 py-2 focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border-b-2 border-gray-300 px-3 py-2 focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block mb-1 font-semibold text-gray-700">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full border-b-2 border-gray-300 px-3 py-2 focus:outline-none focus:border-orange-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-1 top-8 text-gray-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label className="block mb-1 font-semibold text-gray-700">
              Confirm Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter password"
              className="w-full border-b-2 border-gray-300 px-3 py-2 focus:outline-none focus:border-orange-500"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-1 top-8 text-gray-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              className="accent-orange-500"
            />
            <label className="text-gray-700 text-sm">
              I agree to the{" "}
              <span className="text-orange-600 font-semibold cursor-pointer hover:underline">
                Terms and Conditions
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-all"
          >
            Sign Up
          </button>
        </form>

        {/* Messages */}
        {error && (
          <p className="text-center mt-4 text-red-600 font-medium">{error}</p>
        )}
        {message && (
          <p className="text-center mt-4 text-green-600 font-medium">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default Signup;
