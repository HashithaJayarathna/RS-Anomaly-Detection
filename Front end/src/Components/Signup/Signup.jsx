import React, { useState } from "react";
import "./Signup.css";

import user_icon from "../../Assets/LoginSignup/person.png";
import email_icon from "../../Assets/LoginSignup/mail.png";
import password_icon from "../../Assets/LoginSignup/key.png";

const Signup = () => {
  const [action, setAction] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSignup = async () => {
    try {
      const response = await fetch("http://localhost:8000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.detail || "Signup failed");
        setSuccess(null);
        return;
      }

      const data = await response.json();
      setSuccess(data.message || "Signup successful!");
      setError(null);
    } catch (err) {
      setError("An error occurred during signup");
      setSuccess(null);
    }
  };

  return (
    <div className="Background">
    <div className="container">
      <div className="Header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        {action === "Login" ? (
          <div></div>
        ) : (
          <div className="input">
            <img src={user_icon} alt="" />
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}
        <div className="input">
          <img src={email_icon} alt="" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input">
          <img src={password_icon} alt="" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <div className="submit-container">
        <div
          className={action === "Login" ? "submit gray" : "submit"}
          onClick={handleSignup}
        >
          Sign Up
        </div>
      </div>
    </div>
    </div>
  );
};

export default Signup;
