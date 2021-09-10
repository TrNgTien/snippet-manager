import React from "react";
import { Link } from "react-router-dom";
function NavBar() {
  return (
    <div className="nav-bar">
      <Link to="/">
        <h1>Snippet Manager</h1>
      </Link>
      <Link to="/login">
        <h1>Login</h1>
      </Link>
      <Link to="/register">
        <h1>Register</h1>
      </Link>
    </div>
  );
}
export default NavBar;
