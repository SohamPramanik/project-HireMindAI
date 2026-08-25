import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Eye, EyeOff, ShieldCheck } from "lucide-react";

import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      login(res.data.token, res.data.user);

      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "We couldn't sign you in. Please check your credentials.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* LEFT BRAND PANEL */}

      <div className="login-brand">
        <Link to="/" className="login-brand-logo">
          <div className="brand-icon">H</div>

          <span>
            HireMind <b>AI</b>
          </span>
        </Link>

        <div className="brand-content">
          <span className="brand-eyebrow">
            AI-POWERED INTERVIEW PREPARATION
          </span>

          <h1>
            Practice smarter.
            <br />
            <span>Interview better.</span>
          </h1>

          <p>
            Build confidence through realistic AI interviews, personalized
            feedback, and focused preparation.
          </p>

          <div className="brand-features">
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

        <p className="brand-footer">© 2026 HireMind AI</p>
      </div>

      {/* RIGHT LOGIN AREA */}

      <div className="login-area">
        <div className="login-card">
          <div className="mobile-logo">
            <div className="brand-icon">H</div>

            <span>
              HireMind <b>AI</b>
            </span>
          </div>

          <div className="login-header">
            <span className="login-label">WELCOME BACK</span>

            <h2>Sign in to your account</h2>

            <p>Continue your interview preparation journey.</p>
          </div>

          <form className="login-form" onSubmit={handleLogin}>
            {/* EMAIL */}

            <div className="form-group">
              <label htmlFor="email">Email address</label>

              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* PASSWORD */}

            <div className="form-group">
              <div className="password-label">
                <label htmlFor="password">Password</label>

                <button
                  type="button"
                  className="forgot-btn"
                  onClick={() => alert("Password reset coming soon.")}
                >
                  Forgot password?
                </button>
              </div>

              <div className="password-wrapper">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* ERROR */}

            {error && <div className="login-error">{error}</div>}

            {/* SUBMIT */}

            <button
              type="submit"
              className="login-submit-button"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          {/* REGISTER */}

          <div className="register-prompt">
            <span>Don't have an account?</span>

            <Link to="/register">Create an account</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
