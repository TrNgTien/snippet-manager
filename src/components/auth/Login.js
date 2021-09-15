import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import axios from "axios";
import "./styles/AuthForm.scss";
import ErrorMessage from "../misc/ErrorMessage.js";
import environment from "../../util/environment.js";

export default function Login() {
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const { getUser } = useContext(UserContext);
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    const loginData = {
      email: formEmail,
      password: formPassword,
    };
    try {
      await axios.post(`${environment}/auth/login`, loginData);
      await getUser();
      history.push("/");
    } catch (e) {
      if (e.response) {
        if (e.response.data.error) {
          setErrorMessage(e.response.data.error);
        }
      }
      return;
    }
  };
  return (
    <div className="auth-form">
      <h2>Log in</h2>
      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          clear={() => setErrorMessage(null)}
        />
      )}
      <form className="form" onSubmit={handleLogin}>
        <label htmlFor="form-email">Email</label>
        <input
          id="form-email"
          type="email"
          value={formEmail}
          onChange={(e) => setFormEmail(e.target.value)}
        />
        <label htmlFor="form-password">Password</label>
        <input
          id="form-password"
          type="password"
          value={formPassword}
          onChange={(e) => setFormPassword(e.target.value)}
        />

        <button className="btn-submit" type="submit">
          Log in
        </button>
      </form>
      <p>
        Don't have an account yet? <Link to="/register">Register here.</Link>
      </p>
    </div>
  );
}
