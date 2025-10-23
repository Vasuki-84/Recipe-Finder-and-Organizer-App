import React from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

function Login() {
  // for navigate to signup page
  const navigate = useNavigate();
  const handleCreateAccount = () => {
    navigate("/signup");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100  mt-4 " >
        
      <div className="flex flex-col gap-5 text-center  ">
        <h2 className="text-5xl mb-1 ">All of your recipes in one place</h2>
        <p className="text-xl text-gray-700  mb-5">
          A free recipe keeper and meal planner
        </p>
      </div>
      

      {/* search recipes */}
      <div className="flex justify-center mt-6 mb-8">
        <div className="relative flex items-center group w-full max-w-md">
          <input
            type="text"
            placeholder="Search recipes..."
            className="w-full px-4 py-2 border border-gray-300 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700 placeholder-gray-400 transition-all"
          />
          <button
            type="button"
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-r-xl hover:bg-green-700 transition-all group"
          >
            <Search
              size={16}
              className="group-hover:scale-110 transition-transform"
            />
            <span className="font-medium hidden sm:inline">Search</span>
          </button>
        </div>
      </div>

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
      </div>
    </div>
  );
}

export default Login;
