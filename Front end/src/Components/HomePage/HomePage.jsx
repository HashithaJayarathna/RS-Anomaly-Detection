import React from "react";
import { Link,useNavigate } from 'react-router-dom';
import Image from "../../Assets/Image.jpg"; // Import your image
import './HomePage.css';

const HomePage = () => {

    const navigate = useNavigate(); // Initialize useNavigate for redirection

    const handleLogout = () => {
        // Remove token from localStorage or sessionStorage (wherever you stored it)
        localStorage.removeItem("authToken");
        // Redirect to login page
        navigate("/login");
    };

    return (
        <div className="landing-page">
            <div className="background">
                <div className="welcome">
                    Microservice Anomaly Detector.
                </div>
                <img src={Image} alt="Anomaly Detection" className="image"/>
                <div className="description">
                    This application helps in detecting anomalies in microservices architectures using advanced machine learning algorithms. Get into the testing form page, apply your current data, and find out whether it's an anomaly or not.
                </div>
                <div className="button-container">
                    <Link to="/Form">
                        <button className="btn btn-purple hover-purple">
                            Test
                        </button>
                    </Link>
                        <button className="btn btn-red hover-red" onClick={handleLogout}>
                            Logout
                        </button>
                </div>
            </div>
        </div>
    )
}

export default HomePage;