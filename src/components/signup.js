import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/SignupForm.css';


const Signup = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    fname: '',
    lname: '',
    email: '',
    password: '',
    phoneNumber: '',
  });
  const [registrationStatus, setRegistrationStatus] = useState(null);


  const [errors, setErrors] = useState({
    username: '',
    fname: '',
    lname: '',
    email: '',
    password: '',
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
      newErrors.username = 'Username is required';
      setErrors(newErrors);
      return;
    }
    if (formData.fname.trim() === '') {
        newErrors.fname = 'FirstName is required';
        setErrors(newErrors);
        return;
      }
      if (formData.lname.trim() === '') {
        newErrors.lname = 'LastName is required';
        setErrors(newErrors);
        return;
      }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.match(emailRegex)) {
      newErrors.email = 'Invalid email address';
      setErrors(newErrors);
      return;
    }
    const phoneRegex = /^\d{10}$/; // Regular expression for a 10-digit phone number
    if (!formData.phoneNumber.match(phoneRegex)) {
      newErrors.phoneNumber = 'Invalid phone number (10 digits)';
      setErrors(newErrors);
      return;
    }
    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
      setErrors(newErrors);
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/register', formData);
      console.log('User registered successfully');
      setRegistrationStatus('success');
      navigate('/login');
    
      // Optionally, you can redirect the user to another page after successful registration.
    } catch (error) {
      console.error('Error registering user:', error);
      setRegistrationStatus('error');
      // Handle registration failure, e.g., display an error message to the user.
    }
  };

  return (
    <div className="signup-form-container">
      <h2>Signup</h2>
      {registrationStatus === 'success' && <div className="success-message">Registration successful!</div>}
      {registrationStatus === 'error' && <div className="error-message">Registration failed. Please try again.</div>}
     <div>

     </div>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <span>  <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          /></span>
        
          <span className="error-message">{errors.username}</span>
        </div>
        <div className="form-group">
          <label htmlFor="fname">FirstName:</label>
          <input
            type="text"
            id="fname"
            name="fname"
            value={formData.fname}
            onChange={handleInputChange}
          />
          <span className="error-message">{errors.fname}</span>
        </div>
        <div className="form-group">
          <label htmlFor="lname">LastName:</label>
          <input
            type="text"
            id="lname"
            name="lname"
            value={formData.lname}
            onChange={handleInputChange}
          />
          <span className="error-message">{errors.lname}</span>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <span className="error-message">{errors.email}</span>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <span className="error-message">{errors.password}</span>
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
          />
          <span className="error-message">{errors.phoneNumber}</span>
        </div>
        
        <center><button className='btnsubmit bg-dark text-warning signupbtn' type="submit">Signup</button></center>
      </form>
    </div>
  );
};

export default Signup;
