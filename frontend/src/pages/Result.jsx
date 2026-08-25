import { Link } from "react-router-dom";

function Result() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
      }}
    >
      <div
        style={{
          width: "850px",
          background: "#1e293b",
          borderRadius: "20px",
          padding: "40px",
          boxShadow: "0 15px 35px rgba(0,0,0,.4)",
        }}
      >
        {/* Heading */}

        <h1
          style={{
            textAlign: "center",
            fontSize: "42px",
          }}
        >
          🎉 Interview Completed
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#94a3b8",
            marginTop: "10px",
            marginBottom: "40px",
          }}
        >
          Here's your AI Interview Report
        </p>

        {/* Score */}

        <div
          style={{
            textAlign: "center",
            marginBottom: "40px",
          }}
        >
          <h2
            style={{
              fontSize: "70px",
              color: "#22c55e",
            }}
          >
            86%
          </h2>

          <h3>Excellent Performance ⭐</h3>
        </div>

        {/* Stats */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: "20px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              background: "#111827",
              padding: "20px",
              borderRadius: "12px",
              textAlign: "center",
            }}
          >
            <h2>9.2</h2>
            <p>Technical Skills</p>
          </div>

          <div
            style={{
              background: "#111827",
              padding: "20px",
              borderRadius: "12px",
              textAlign: "center",
            }}
          >
            <h2>8.5</h2>
            <p>Communication</p>
          </div>

          <div
            style={{
              background: "#111827",
              padding: "20px",
              borderRadius: "12px",
              textAlign: "center",
            }}
          >
            <h2>8.9</h2>
            <p>Problem Solving</p>
          </div>
        </div>

        {/* Feedback */}

        <div
          style={{
            background: "#111827",
            padding: "25px",
            borderRadius: "15px",
            marginBottom: "30px",
          }}
        >
          <h2>💬 AI Feedback</h2>

          <p
            style={{
              color: "#cbd5e1",
              marginTop: "15px",
              lineHeight: "1.8",
            }}
          >
            Great job! You demonstrated a solid understanding of backend
            development concepts, JWT authentication, REST APIs and MongoDB. Try
            improving your explanations with more real-world examples and
            mention best practices wherever possible.
          </p>
        </div>

        {/* Strength */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "25px",
            marginBottom: "35px",
          }}
        >
          <div
            style={{
              background: "#111827",
              padding: "20px",
              borderRadius: "15px",
            }}
          >
            <h2>✅ Strengths</h2>

            <ul
              style={{
                marginTop: "15px",
                lineHeight: "2",
              }}
            >
              <li>REST APIs</li>
              <li>JWT Authentication</li>
              <li>MongoDB</li>
              <li>Express.js</li>
            </ul>
          </div>

          <div
            style={{
              background: "#111827",
              padding: "20px",
              borderRadius: "15px",
            }}
          >
            <h2>📚 Improve</h2>

            <ul
              style={{
                marginTop: "15px",
                lineHeight: "2",
              }}
            >
              <li>Redis</li>
              <li>Docker</li>
              <li>System Design</li>
              <li>Caching</li>
            </ul>
          </div>
        </div>

        {/* Buttons */}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          <Link to="/dashboard">
            <button
              style={{
                background: "#6366f1",
                color: "white",
                border: "none",
                padding: "14px 28px",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Dashboard
            </button>
          </Link>

          <Link to="/interview/setup">
            <button
              style={{
                background: "#22c55e",
                color: "white",
                border: "none",
                padding: "14px 28px",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Start New Interview
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Result;
