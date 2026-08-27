import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";

import API from "../services/api";

import "./Register.css";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
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
      {/* =========================================
          LEFT BRAND PANEL
      ========================================= */}

      <div className="register-brand-panel">
        <Link to="/" className="register-brand-logo">
          <div className="register-brand-icon">H</div>

          <span>
            HireMind <b>AI</b>
          </span>
        </Link>

        <div className="register-brand-content">
          <span className="register-eyebrow">
            AI-POWERED INTERVIEW PREPARATION
          </span>

          <h1>
            Prepare smarter.
            <br />
            <span>Get hired faster.</span>
          </h1>

          <p>
            Practice realistic interviews, improve your answers, and build the
            confidence you need to perform at your best.
          </p>

          <div className="register-features">
            <div>
              <ShieldCheck size={18} />
              Secure & private
            </div>

            <div>
              <ShieldCheck size={18} />
              AI-powered feedback
            </div>
          </div>
        </div>

        <p className="register-brand-footer">© 2026 HireMind AI</p>
      </div>

      {/* =========================================
          RIGHT REGISTER AREA
      ========================================= */}

      <div className="register-area">
        <div className="register-card">
          {/* MOBILE LOGO */}

          <div className="register-mobile-logo">
            <div className="register-brand-icon">H</div>

            <span>
              HireMind <b>AI</b>
            </span>
          </div>

          {/* HEADER */}

          <div className="register-header">
            <span className="register-label">GET STARTED</span>

            <h2>Create your account</h2>

            <p>Start your interview preparation journey today.</p>
          </div>

          {/* FORM */}

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

              <div className="register-password-wrapper">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  className="register-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <span className="register-hint">Use at least 8 characters.</span>
            </div>

            {/* ERROR */}

            {error && (
              <div className="register-error" role="alert">
                {error}
              </div>
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

          {/* LOGIN */}

          <div className="register-footer">
            <span>Already have an account?</span>

            <Link to="/login">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
