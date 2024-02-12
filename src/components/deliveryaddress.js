import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/SignupForm.css';

const DeliveryAddress = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    fname: '', // Add fname to the initial state
    phoneNumber: '',
    specialInstructions: '',
  });
  const [errors, setErrors] = useState({
    username: '',
    fname: '', // Add fname to the errors state
    phoneNumber: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (formData.username.trim() === '') {
      newErrors.username = 'Delivery address is required';
    }

    if (formData.fname.trim() === '') {
      newErrors.fname = 'Suit No is required';
    }

    const phoneRegex = /^\d{10}$/; // Regular expression for a 10-digit phone number
    if (!formData.phoneNumber.match(phoneRegex)) {
      newErrors.phoneNumber = 'Invalid phone number (10 digits)';
    }

    setErrors(newErrors);

    // Check if there are no errors before navigating
    if (Object.keys(newErrors).length === 0) {
      navigate('/thankyou');
    }
  };

  return (
    <div className="signup-form-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Delivery address:</label>
          <input
            type="text"
            id="username"
            name="username"
            className="form-control"
            value={formData.username}
            onChange={handleInputChange}
          />
          <span className="error-message">{errors.username}</span>
        </div>
        <div className="form-group">
          <label htmlFor="fname">Suit No:</label>
          <input
            type="text"
            id="fname"
            name="fname"
            className="form-control"
            value={formData.fname}
            onChange={handleInputChange}
          />
          <span className="error-message">{errors.fname}</span>
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            className="form-control"
            value={formData.phoneNumber}
            onChange={handleInputChange}
          />
          <span className="error-message">{errors.phoneNumber}</span>
        </div>
        <div className="form-group">
          <label htmlFor="specialInstructions">Special Instructions For Driver:</label>
          <textarea
            id="specialInstructions"
            name="specialInstructions"
            className="form-control"
            value={formData.specialInstructions}
            onChange={handleInputChange}
          />
        </div>
        <center>
          <button className="btnsubmit signupbtn" type="submit">
            Confirm
          </button>
        </center>
      </form>
    </div>
  );
};

export default DeliveryAddress;
