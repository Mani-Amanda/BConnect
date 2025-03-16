import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
  const navigate = useNavigate();

  const handleSignUp = () => navigate("/signup");
  const handleSignIn = () => navigate("/signin");

  return (
    <><Navbar/>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 pt-20">
    <div className="relative w-full">
    <div
      className="absolute inset-0 bg-cover bg-center opacity-20"
      style={{ backgroundImage: "url('/bg.jpg')" }} 
    ></div>

  {/* Overlay Content */}
  <div className="relative z-10 flex flex-col items-center justify-center min-h-[70vh] px-4 pt-12 pb-20">
    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-green-700 text-center">
      Welcome to BConnect
    </h1>
    <p className="text-gray-800 mb-8 text-center max-w-2xl">
      A simple platform to get started. Join us now!
    </p>
    <div className="flex flex-col sm:flex-row gap-4">
      <button
        onClick={handleSignUp}
        className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
      >
        Sign Up
      </button>
      <button
        onClick={handleSignIn}
        className="bg-white text-green-700 border border-green-600 px-6 py-3 rounded-lg hover:bg-green-100 transition"
      >
        Sign In
      </button>
    </div>
  </div>
</div>


      <div id="about" className="mt-24 px-6 max-w-3xl text-center">
        <h2 className="text-2xl font-bold mb-4 text-green-700">About Us</h2>
        <p className="text-gray-600">
          BConnect is a simple platform designed to streamline your connection experience.
          Whether you're signing up or signing in, our platform is built to be easy, secure, and reliable.
        </p>
      </div>
    </div>
    </>
  );
};

export default Home;
