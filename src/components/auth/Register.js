import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import UserContext from "../../context/UserContext";

import "./styles/AuthForm.scss";
import ErrorMessage from "../misc/ErrorMessage.js";
import environment from "../../util/environment.js";

export default function Register() {
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [formPasswordVerify, setFormPasswordVerify] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const { getUser } = useContext(UserContext);
  const history = useHistory();

  const handleRegister = async (e) => {
    e.preventDefault();
    const registerData = {
      email: formEmail,
      password: formPassword,
      passwordVerify: formPasswordVerify,
    };
    try {
      await axios.post(`${environment}/auth/`, registerData);
    } catch (e) {
      if (e.response) {
        if (e.response.data.error) {
          setErrorMessage(e.response.data.error);
        }
      }
      return;
    }
    await getUser();
    history.push("/");
  };
  return (
    <div className="auth-form">
      <h2>Register a new accout</h2>
      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          clear={() => setErrorMessage(null)}
        />
      )}
      <form className="form" onSubmit={handleRegister}>
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
        <label htmlFor="form-password-verify">Verify Password</label>
        <input
          id="form-password-verify"
          type="password"
          value={formPasswordVerify}
          onChange={(e) => setFormPasswordVerify(e.target.value)}
        />
        <button className="btn-submit" type="submit">
          Register
        </button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login instead</Link>
      </p>
    </div>
  );
}
