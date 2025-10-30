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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100  mt-4 h-screen w-full">
      {/* for adding new recipes */}
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-semibold mb-4">Log In</h1>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleInput}
            className="w-full mb-3 p-2 border rounded-lg"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleInput}
            className="w-full mb-3 p-2 border rounded-lg"
          />
          <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-all">
            Log In
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default Login;
