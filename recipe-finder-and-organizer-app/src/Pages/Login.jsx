import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch(); // to access datas from redux-store

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // fetch all users data from db.json
      const res = await axios.get("http://localhost:5000/users");

      // find a user with matching email & password
      const user = res.data;
      const findDetails = user.find(
        (u) => u.email === email && u.password === password
      );
      if (findDetails) {
        dispatch(login(findDetails));
        localStorage.setItem("loggedInUser", JSON.stringify(findDetails)); //  store in localStorage (keeps user logged in after refresh)

        navigate("/profile");
        e.preventDefault();
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }
  };

  // sent the email & password to the localStorage
  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  return (
     <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-x-1 place-items-center  justify-around items-center m-auto   min-h-screen   mt-4 h-screen w-full bg-green-100 ">
      {/* for adding new recipes */}
       <div className="mask-x-from-80% mask-x-to-100% h-screen mask-type-alpha   backdrop-blur-sm">
      <img src="https://i.pinimg.com/736x/57/5f/29/575f29fc6cdfb3984e6649eb4e394a63.jpg"/></div>

   <div>

      <div className="   rounded-2xl w-full max-w-md text-center ">
       
        <h1 className="text-2xl font-semibold mb-10 ">Log In</h1>
      
        <form onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleInput}
            className="w-full mb-6 p-2 border-b ouline-2 hover:border-green-600  focus:outline-green-600 rounded-lg"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleInput}
            className="w-full mb-10 p-2 border-b hover:border-green-600  focus:outline-green-600  rounded-lg"
          />
          <button className="w-full bg-white text-green border hover:outline-2 hover:bg-green-400  hover:text-white ...  hover:shadow-lg py-2 rounded-lg transition-all">
            Log In
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      </div>
      </div>
    
       
     


      
    
    </div>
  );
}

export default Login;
