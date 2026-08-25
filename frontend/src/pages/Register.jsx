import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

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
      const res = await API.post("/auth/register", {
        name,
        email,
        password,
      });

      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "We couldn't create your account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "24px",
        background:
          "radial-gradient(circle at top left, rgba(184,147,90,0.08), transparent 45%), radial-gradient(circle at bottom right, rgba(184,147,90,0.05), transparent 45%), #0b0c0f",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div
        style={{
          width: "430px",
          maxWidth: "100%",
          background: "rgba(255,255,255,0.035)",
          backdropFilter: "blur(18px)",
          border: "1px solid rgba(255,255,255,0.09)",
          padding: "44px 40px",
          borderRadius: "10px",
          color: "#f2efe9",
          boxShadow: "0 20px 48px rgba(0,0,0,0.45)",
        }}
      >
        <p
          style={{
            textAlign: "center",
            fontFamily: "'Playfair Display', serif",
            fontSize: "26px",
            fontWeight: 700,
            letterSpacing: "-0.01em",
            marginBottom: "8px",
          }}
        >
          HireMind
        </p>

        <h1
          style={{
            textAlign: "center",
            fontSize: "17px",
            fontWeight: 400,
            color: "#9b968e",
            marginBottom: "34px",
          }}
        >
          Create your account to start practicing
        </h1>

        <form
          onSubmit={handleRegister}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
          }}
        >
          <div>
            <label
              htmlFor="name"
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: 500,
                color: "#9b968e",
                marginBottom: "8px",
              }}
            >
              Full name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Jordan Lee"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "13px 14px",
                borderRadius: "6px",
                border: "1px solid rgba(255,255,255,0.09)",
                background: "rgba(255,255,255,0.03)",
                color: "#f2efe9",
                fontSize: "15px",
                fontFamily: "inherit",
              }}
            />
          </div>

          <div>
            <label
              htmlFor="email"
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: 500,
                color: "#9b968e",
                marginBottom: "8px",
              }}
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "13px 14px",
                borderRadius: "6px",
                border: "1px solid rgba(255,255,255,0.09)",
                background: "rgba(255,255,255,0.03)",
                color: "#f2efe9",
                fontSize: "15px",
                fontFamily: "inherit",
              }}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: 500,
                color: "#9b968e",
                marginBottom: "8px",
              }}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="At least 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              style={{
                width: "100%",
                padding: "13px 14px",
                borderRadius: "6px",
                border: "1px solid rgba(255,255,255,0.09)",
                background: "rgba(255,255,255,0.03)",
                color: "#f2efe9",
                fontSize: "15px",
                fontFamily: "inherit",
              }}
            />
          </div>

          {error && (
            <p
              role="alert"
              style={{
                fontSize: "14px",
                color: "#c98a80",
                margin: 0,
              }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "14px",
              borderRadius: "6px",
              border: "1px solid #b8935a",
              background: loading ? "rgba(184,147,90,0.5)" : "#b8935a",
              color: "#17140d",
              fontWeight: 600,
              letterSpacing: "0.02em",
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: "16px",
              marginTop: "8px",
              transition: "0.3s ease",
            }}
          >
            {loading ? "Creating account…" : "Create account"}
          </button>
        </form>

        <p
          style={{
            marginTop: "28px",
            textAlign: "center",
            fontSize: "14px",
            color: "#9b968e",
          }}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "#d9bb85",
              fontWeight: 500,
            }}
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}