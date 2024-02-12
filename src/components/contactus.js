import React, { useState } from "react";
import "./css/SignupForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { useAuth } from "../Context/AuthContext";

const ContactForm = () => {
  const { state, dispatch } = useAuth();

  const [formData, setFormData] = useState({
    name: state?.user?.fname || "",
    email: state?.user?.email || "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (formData.name.trim() === "") {
      newErrors.name = "name is required";
    }
    if (formData.email.trim() === "") {
      newErrors.email = "email is required";
    }
    if (formData.message.trim() === "") {
      newErrors.message = "Message is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    setErrors(newErrors);
  };

  return (
    <div className="signup-form-container">
      <h2>Contact us</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Your Name:</label>
          <span>
            {" "}
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </span>

          <span className="error-message">{errors.name}</span>
        </div>
        <div className="form-group">
          <label htmlFor="email">Your Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <span className="error-message">{errors.email}</span>
        </div>
        <div className="form-group">
          <label htmlFor="message">Your Meassage:</label>
          <input
            type="text"
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
          />
          <span className="error-message">{errors.message}</span>
        </div>

        <center>
          <button className="btnsubmit signupbtn" type="submit">
            Submit
          </button>
        </center>
      </form>

      <div className="contact-info-container">
        <h2>Contact Information</h2>
        <p>Email: hungryhub@gmail.com</p>
        <p>Phone: +1 123-456-7890</p>

        <div className="social-media-icons">
          <a href="https://www.facebook.com">
            <FontAwesomeIcon icon={faFacebook} size="2x" />
          </a>
          <a href="https://www.twitter.com">
            <FontAwesomeIcon icon={faTwitter} size="2x" />
          </a>
          <a href="https://www.instagram.com">
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
