import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/signup");
  };
  const handleSignIn = () => {
    navigate("/signin");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Welcome to BConnect</h1>
      <p className="text-gray-700 mb-8 text-center px-4">
        A simple platform to get started. Join us now!
      </p>
      <button
        onClick={handleSignUp}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
      >
        Sign Up
      </button>
      <button
        onClick={handleSignIn}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
      >
        Sign In
      </button>
    </div>
  );
};

export default Home;