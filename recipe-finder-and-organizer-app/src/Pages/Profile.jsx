import React from "react";

function Profile() {
  return (
    <div className="p-6 min-h-screen bg-gray-200 mt-13">
      <h2 className="font-semibold text-3xl text-center mb-6 mt-6 flex-wrap ">
        Turn your kitchen experiments into recipes — add now🍽️
      </h2>
      <form className="bg-white p-4 rounded-2xl  max-w-md mx-auto shadow-2xl">
        <h2 className="font-semibold text-2xl text-center mb-6 ">
          Add your recipes
        </h2>

        <label>Recipe name</label>
        <input
          className="border-b rounded w-full mb-3 border-gray-500  px-2 py-2 focus:outline-none focus:border-orange-500  "
          type="text"
        ></input>
        <label>Ingredients</label>
        <input
          className="border-b rounded w-full mb-3 border-gray-500 px-2 py-2 focus:outline-none focus:border-orange-500 "
          type="text"
        ></input>
        <label>Description</label>
        <input
          className="border-b rounded w-full mb-3 border-gray-500 px-2 py-2 focus:outline-none focus:border-orange-500 "
          type="text"
        ></input>
        <button className="w-full bg-orange-500 hover:bg-orange-600 text-white p-2 mt-3  rounded-lg transition-all">
          Add a recipe
        </button>
        <p className="text-sm text-gray-600 mt-3 text-center">
          Are you sure? you want to{" "}
          <span className="text-green-600 underline cursor-pointer">
            Log out
          </span>
          .
        </p>
      </form>
    </div>
  );
}

export default Profile;
