import React from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

function Login() {
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  bg-[url('https://i.pinimg.com/1200x/be/c6/6b/bec66b9c4e110e27abf664e9afc7065f.jpg')] bg-fixed bg-cover h-screen w-full" >
        
      <div className="flex flex-col gap-5 text-center  ">
        <h2 className="text-5xl mb-1 font-serif  text-wrap ">All of your recipes in one place</h2>
        <p className="text-xl text-gray-700  mb-5 font-mono">
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

      
    </div>
  );
}

export default Login;
