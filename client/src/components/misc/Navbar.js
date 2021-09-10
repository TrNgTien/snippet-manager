import React from "react";
import { Link } from "react-router-dom";
import "./styles/NavBar.scss";
function NavBar() {
  return (
    <div className="navbar">
      <Link to="/">
        <h1>Snippet Manager</h1>
      </Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </div>
  );
}
export default NavBar;
