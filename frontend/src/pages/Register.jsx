import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import API from "../services/api";
import "./Register.css";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await API.post("/auth/register", {
        name,
        email,
        password,
      });

      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "We couldn't create your account. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-wrapper">
        {/* BRAND */}
        <div className="register-brand">
          <div className="register-brand-icon">✦</div>
          <span>HireMind AI</span>
        </div>

        {/* CARD */}
        <div className="register-card">
          <div className="register-header">
            <h1>Create your account</h1>
            <p>Start practicing smarter and prepare for your next interview.</p>
          </div>

          <form className="register-form" onSubmit={handleRegister}>
            {/* NAME */}
            <div className="register-field">
              <label htmlFor="name">Full name</label>

              <input
                id="name"
                type="text"
                placeholder="Jordan Lee"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
              />
            </div>

            {/* EMAIL */}
            <div className="register-field">
              <label htmlFor="email">Email address</label>

              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            {/* PASSWORD */}
            <div className="register-field">
              <label htmlFor="password">Password</label>

              <input
                id="password"
                type="password"
                placeholder="At least 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                autoComplete="new-password"
              />

              <span className="register-hint">Use at least 8 characters.</span>
            </div>

            {/* ERROR */}
            {error && (
              <p className="register-error" role="alert">
                {error}
              </p>
            )}

            {/* SUBMIT */}
            <button
              type="submit"
              className="register-submit"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          {/* LOGIN LINK */}
          <div className="register-footer">
            <span>Already have an account?</span>

            <Link to="/login">Sign in</Link>
          </div>
        </div>

        {/* BOTTOM TEXT */}
        <p className="register-bottom-text">
          AI-powered interview preparation for serious candidates.
        </p>
      </div>
    </div>
  );
}
