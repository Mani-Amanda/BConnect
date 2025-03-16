import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold text-green-700">BConnect</h1>
        <div className="space-x-6 text-sm font-medium">
          <Link to="/" className="text-gray-700 hover:text-green-600 transition">Home</Link>
          <a href="#about" className="text-gray-700 hover:text-green-600 transition">About</a>
          <Link to="/signup" className="text-gray-700 hover:text-green-600 transition">Sign Up</Link>
          <Link to="/signin" className="text-gray-700 hover:text-green-600 transition">Sign In</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
