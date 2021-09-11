import axios from "axios";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";
import "./styles/NavBar.scss";
function NavBar() {
  const { user, getUser } = useContext(UserContext);

  const logOut = async () => {
    await axios.get("http://localhost:5000/auth/logOut");
    await getUser();
  };
  return (
    <div className="navbar">
      <Link to="/">
        <h1>Snippet Manager</h1>
      </Link>
      {user === null ? (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      ) : (
        user && (
          <button onClick={logOut} className="btn-logout">
            Log out
          </button>
        )
      )}
    </div>
  );
}
export default NavBar;
