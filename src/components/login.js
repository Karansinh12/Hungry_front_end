import React, { useState } from "react";
import axios from "axios";
import "./css/LoginForm.css";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useAuth } from "../Context/AuthContext";

const Login = () => {
  const { state, dispatch } = useAuth();

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    // Validation checks (similar to your existing code)

    if (Object.keys(newErrors).length > 0) {
      // If there are validation errors, update the state and return
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/login",
        formData
      );
      const user = response.data.user; // Replace with the actual user data key
      dispatch({ type: "LOGIN", user });
      navigate("/restlist");
      // Perform actions such as redirecting the user or storing authentication token in state/storage
    } catch (error) {
      console.error("Error logging in:", error);
      // Handle login failure, display error message to the user, etc.
      setErrorMessage("Invalid username or password. Please try again.");
    }
  };

  return (
    <div className="login-form-container">
      <h2>Login</h2>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form className="login-form" onSubmit={handleSubmit}>
        {/* Your form inputs and error messages */}
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
          <span className="error-message">{errors.username}</span>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <span className="error-message">{errors.password}</span>
        </div>
        <center>
          <button className="btnsubmit text-warning signupbtn" type="submit">
            Login
          </button>
        </center>
        <Link to="/reset-password" className="forget-pass">Forgot Password?</Link>
        <Link to="/change-pswd" className="forget-pass">Change Password?</Link>
      </form>
    </div>
  );
};

export default Login;
