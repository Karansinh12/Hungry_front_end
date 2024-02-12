import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/logout.css";
import { useAuth } from "../Context/AuthContext";

const Logout = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useAuth();
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return (
    <div className="logout-container" style={{marginBottom:'500px'}}>
      <p className="logout-message">Are you sure you want to log out?</p>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Logout;
