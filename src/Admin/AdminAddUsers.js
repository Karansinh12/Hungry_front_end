import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../components/css/SignupForm.css';

const AddUser = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    fname: '',
    lname: '',
    phoneNumber: '',
    email: '',
    password: '',
  });

  const [addUserStatus, setAddUserStatus] = useState(null);

  const [errors, setErrors] = useState({
    username: '',
    fname: '',
    lname: '',
    phoneNumber: '',
    email: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (formData.username.trim() === '') newErrors.username = 'Username is required';
    if (formData.fname.trim() === '') newErrors.fname = 'FirstName is required';
    if (formData.lname.trim() === '') newErrors.lname = 'LastName is required';
    const phoneRegex = /^\d{10}$/;
    if (!formData.phoneNumber.match(phoneRegex)) newErrors.phoneNumber = 'Invalid phone number (10 digits)';
    if (formData.email.trim() === '') newErrors.email = 'Email is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        await axios.post('http://localhost:5000/api/add-user', formData);
        setAddUserStatus('success');
        navigate('/admin/manageusers');
      } catch (error) {
        console.error('Error adding user:', error);
        setAddUserStatus('error');
      }
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="signup-form-container">
            <h2>Add User</h2>
            {addUserStatus === 'success' && (
              <div className="alert alert-success">User added successfully!</div>
            )}
            {addUserStatus === 'error' && (
              <div className="alert alert-danger">User addition failed. Please try again.</div>
            )}
            <form className="signup-form" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username:</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className={`form-control ${errors.username && 'is-invalid'}`}
                />
                {errors.username && <div className="invalid-feedback">{errors.username}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="fname" className="form-label">FirstName:</label>
                <input
                  type="text"
                  id="fname"
                  name="fname"
                  value={formData.fname}
                  onChange={handleInputChange}
                  className={`form-control ${errors.fname && 'is-invalid'}`}
                />
                {errors.fname && <div className="invalid-feedback">{errors.fname}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="lname" className="form-label">LastName:</label>
                <input
                  type="text"
                  id="lname"
                  name="lname"
                  value={formData.lname}
                  onChange={handleInputChange}
                  className={`form-control ${errors.lname && 'is-invalid'}`}
                />
                {errors.lname && <div className="invalid-feedback">{errors.lname}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="phoneNumber" className="form-label">Phone Number:</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className={`form-control ${errors.phoneNumber && 'is-invalid'}`}
                />
                {errors.phoneNumber && <div className="invalid-feedback">{errors.phoneNumber}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`form-control ${errors.email && 'is-invalid'}`}
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <center>
                <button className="btn bg-dark text-warning" type="submit">Add User</button>
              </center>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
