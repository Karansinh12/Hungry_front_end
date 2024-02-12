// AuthContext.js
import React, { createContext, useContext, useReducer, useEffect } from "react";

const AuthContext = createContext();

const initialState = {
  isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
  user: JSON.parse(localStorage.getItem("user")) || null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user", JSON.stringify(action.user));
      return { ...state, isAuthenticated: true, user: action.user };
    case "LOGOUT":
      localStorage.setItem("isAuthenticated", "false");
      localStorage.removeItem("user"); // Remove the user data from localStorage
      return { ...state, isAuthenticated: false, user: null };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const storedAuthState = localStorage.getItem("isAuthenticated") === "true";
    const storedUser = JSON.parse(localStorage.getItem("user")) || null;

    // Avoid dispatching if the values are the same to prevent infinite loop
    if (
      storedAuthState !== state.isAuthenticated ||
      storedUser !== state.user
    ) {
      dispatch({
        type: storedAuthState ? "LOGIN" : "LOGOUT",
        user: storedUser,
      });
    }
  }, []); // Only use state in the dependency array

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
