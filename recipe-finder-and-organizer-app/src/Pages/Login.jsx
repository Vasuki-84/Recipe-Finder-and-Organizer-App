import React from 'react'
import { useNavigate } from 'react-router-dom';

function Login() {
    // for navigate to signup page
  const navigate = useNavigate();
  const handleCreateAccount = () => {
    navigate("/AddRecipes");
  };
  return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100  mt-4 " >
    {/* for adding new recipes */}
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-semibold mb-4">Add a new Recipe</h1>
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded-lg"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-2 border rounded-lg"
        />
        <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-all">
          Log In
        </button>

        <p className="text-gray-500 text-sm mt-3">
          Don't have an account?{" "}
          <button
            onClick={handleCreateAccount}
            className="text-blue-600 font-medium hover:underline"
          >
            Create Account
          </button>
        </p>
      </div></div>
  )
}

export default Login