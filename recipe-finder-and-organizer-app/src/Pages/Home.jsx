import React from "react"


function Home() {
  return (
    <div className="min-h-screen p-7 bg-gray-200">
   
        <div className="flex flex-col gap-5 text-center mt-15 m-10 "> 
          <h2 className="text-5xl ">All of your recipes in one place</h2>
          <p className="text-xl ">A free recipe keeper and meal planner</p>
        </div>
        <div className="text-center ">
          <button className="mt-4 bg-blue-400 px-2 py-1 rounded font-semibold  "> CREATE AN ACCOUNT</button>
        </div>
      
    </div>
  );
}

export default Home;
