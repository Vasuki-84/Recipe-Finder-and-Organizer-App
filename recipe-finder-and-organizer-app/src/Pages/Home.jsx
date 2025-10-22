import React from "react"


function Home() {
  return (
    <div className="min-h-screen p-7 bg-gray-100">
   
        <div className="flex flex-col gap-5 text-center mt-15 m-10 "> 
          <h2 className="text-5xl ">All of your recipes in one place</h2>
          <p className="text-xl text-gray-700 ">A free recipe keeper and meal planner</p>
        </div>
        <div className="text-center ">
          <button className="mt-4 bg-blue-500 px-2 py-2 rounded-full font-semibold  "> CREATE AN ACCOUNT</button>
        </div>
      
    </div>
  );
}

export default Home;
