import React, { useContext, useState } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";


export const Login = () => {
  const { email, setEmail, password, setPassword, error, setError,  userLogged,
    setUserLogged,uniqueId,setUniqueId} =
    useContext(UserContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setError("Please fill in both fields");
    } else {
      setError(""); // Reset error if both fields are filled
      console.log("Form submitted with", { email, password });
      const response = await fetch("https://ecommerce-fullstack-r9n1.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        console.log(data);
        if(data.message === "Login successful!"){
        setUserLogged((prev) => !prev);
        localStorage.setItem("user", true);
        setUniqueId(data._id)
        localStorage.setItem("uniqueId", data._id);
        setEmail('')
        setPassword('')
        navigate("/");
      }
        else{
            setError(data.message);
        }
    }
    }
  };

  return (
    <div className="flex justify-center items-center h-[650px] px-4 md:px-0">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-center text-3xl font-bold text-blue-600 mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center mb-4">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
