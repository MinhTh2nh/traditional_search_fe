import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";
import { ThemeContext } from "./context/ThemeContext"; // Make sure the path is correct

function Dropdown({ label, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li className="dropdown">
      <button onClick={() => setIsOpen(!isOpen)}>
        {label}
        <span className="dropdown-icon">{isOpen ? "▲" : "▼"}</span>
      </button>
      {isOpen && <ul>{children}</ul>}
    </li>
  );
}

function Sidebar() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className={`sidebar ${theme === "dark" ? "dark-mode" : ""}`}>
      <ul>
        <li>
          <Link to="/home-admin">Home</Link>
        </li>
        <li>
          <Link to="/profile-manage">Users Management</Link>
        </li>
        <li>
          <Link to="/product-manage">Products Management</Link>
        </li>
        <li>
          <Link to="/order-manage">Order Management</Link>
        </li>
        <li>
          <Link to="/">Sign Out</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
