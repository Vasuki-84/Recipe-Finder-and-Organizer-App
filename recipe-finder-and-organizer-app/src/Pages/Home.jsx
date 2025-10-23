
import React from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate(); 

  const handleCreateAccount = () => {
    navigate("/signup"); 
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col gap-5 text-center  ">
        <h2 className="text-5xl mb-1 ">All of your recipes in one place</h2>
        <p className="text-xl text-gray-700  mb-5">
          A free recipe keeper and meal planner
        </p>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-semibold mb-4">Welcome Back</h1>
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
          Don’t have an account?{" "}
          <button
            onClick={handleCreateAccount}
            className="text-blue-600 font-medium hover:underline"
          >
            Create Account
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
