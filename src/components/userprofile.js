import React from "react";
import "./css/userprofile.css"; 
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const UserProfile = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useAuth();
  if (!state.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return (
    <div className="user-profile-container"  style={{marginBottom:'250px'}}> 
      <div className="profile-header">
        <p className="id">ID: {state.user._id}</p>
        <h1 className="username">Username: {state.user.username}</h1>
        <p className="name">First Name: {state.user.fname}</p>
        <p className="name">Last Name: {state.user.lname}</p>
        <p className="name">Email: {state.user.email}</p>
        <p className="phone">Phone Number: {state.user.phoneNumber}</p>
      </div>

      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default UserProfile;
