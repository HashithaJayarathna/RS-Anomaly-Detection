import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Image from "../Assets/Image.jpg"; // Import your image

const HomePage = () => {
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  useEffect(() => {
    const token = localStorage.getItem("token");

    // If no token is found, redirect to login
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem("token");
    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen max-h-screen p-4 bg-gray-100">
      <h1 className="text-2xl font-bold text-purple-600 mb-2">
        Anomaly Detector on Microservices
      </h1>
      <img
        src={Image}
        alt="Anomaly Detection"
        className="w-full max-h-60 object-cover mb-4"
      />
      <p className="text-gray-700 text-center mb-4 text-sm">
        This application helps in detecting anomalies in microservices
        architectures using advanced machine learning algorithms. Get into the
        testing form page, apply your current data, and find out whether it's an
        anomaly or not.
      </p>
      <div className="flex space-x-4">
        <Link to="/Form">
          <button className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700">
            Test
          </button>
        </Link>
        <button
          className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default HomePage;
