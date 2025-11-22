import React from "react";
import { useAuth } from "../context/AuthContext"; // make sure this is imported
import "../styles/Navbar.css";

const Navbar = () => {
  const { currentUser } = useAuth(); // 🔹 use currentUser instead of user

  const getInitials = (name = "") =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2 className="logo">E-Medra</h2>
        <span className="subtitle">Blockchain Healthcare</span>
      </div>

      <div className="navbar-center">
        <input
          type="text"
          className="search-bar"
          placeholder="Search records, doctors..."
        />
      </div>

      <div className="navbar-right">
        <div className="profile-circle">
          {currentUser?.displayName
            ? getInitials(currentUser.displayName)
            : "??"}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


