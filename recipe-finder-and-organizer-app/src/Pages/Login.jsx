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
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // to fetch the datas from sign up
      const res = await axios.get("http://localhost:5000/users");

      //  Check user credentials
      const user = res.data.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        //  Store user in Redux + localStorage
        // When someone logs in → they’re “inside” (stored in localStorage).
        // When they log out → they’re removed from localStorage,but their record remains in the database (db.json).
        
        dispatch(login(user));
        localStorage.setItem("loggedInUser", JSON.stringify(user));

        //  Navigate to user-specific profile (no preventDefault after this)
        console.log("User found:", user);

        navigate(`/profile/${user.id}`);
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again later.");
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
  };

  return (
    <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-x-1 place-items-center justify-around items-center m-auto min-h-screen mt-4 min-h-screen w-full bg-green-100 ">
      <div className="mask-x-from-80% mask-x-to-100% h-screen mask-type-alpha backdrop-blur-sm">
        <img
          src="https://i.pinimg.com/736x/57/5f/29/575f29fc6cdfb3984e6649eb4e394a63.jpg"
          alt="Login Illustration"
        />
      </div>

      <div>
        <div className="rounded-2xl w-full max-w-md text-center mb-10">
          <h1 className="text-2xl font-semibold mb-10">Log In</h1>

          <form onSubmit={handleLogin}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={handleInput}
              className="w-full mb-6 p-2 border-b outline-none hover:border-green-600 focus:border-green-600 rounded-lg"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handleInput}
              className="w-full mb-10 p-2 border-b outline-none hover:border-green-600 focus:border-green-600 rounded-lg"
              required
            />
            <button
              type="submit"
              className="w-full bg-white text-green border hover:bg-green-400 hover:text-white hover:shadow-lg py-2 rounded-lg transition-all"
            >
              Log In
            </button>
            {error && <p className="text-red-600 mt-4">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
