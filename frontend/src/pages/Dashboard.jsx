import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useState } from "react";

function Dashboard() {
  const { user } = useContext(AuthContext);
  const [dashboard, setDashboard] = useState({
    totalInterviews: 0,
    averageScore: 0,
    completed: 0,
    pending: 0,
    recentInterviews: [],
  });
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "40px",
      }}
    >
      <h1 style={{ marginBottom: "10px" }}>
        👋 Welcome, {user ? user.name : "Guest"}
      </h1>

      <p
        style={{
          color: "#94a3b8",
          marginBottom: "40px",
        }}
      >
        Ready for your next AI interview?
      </p>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginBottom: "40px",
        }}
      >
        <div
          style={{
            background: "#1e293b",
            padding: "25px",
            borderRadius: "15px",
          }}
        >
          <h2>{dashboard.totalInterviews}</h2>
          <p>Total Interviews</p>
        </div>

        <div
          style={{
            background: "#1e293b",
            padding: "25px",
            borderRadius: "15px",
          }}
        >
          <h2>{dashboard.averageScore}</h2>
          <p>Average Score</p>
        </div>

        <div
          style={{
            background: "#1e293b",
            padding: "25px",
            borderRadius: "15px",
          }}
        >
          <h2>{dashboard.completed}</h2>
          <p>Completed</p>
        </div>

        <div
          style={{
            background: "#1e293b",
            padding: "25px",
            borderRadius: "15px",
          }}
        >
          <h2>{dashboard.pending}</h2>
          <p>Pending</p>
        </div>
      </div>

      {/* Start Interview */}
      <div
        style={{
          background: "#1e293b",
          padding: "30px",
          borderRadius: "15px",
          marginBottom: "30px",
        }}
      >
        <h2>🚀 Start a New Interview</h2>

        <p
          style={{
            color: "#94a3b8",
            margin: "15px 0",
          }}
        >
          Practice Backend, Frontend, MERN Stack and many more.
        </p>

        <Link to="/interview/setup">
          <button
            style={{
              background: "#6366f1",
              color: "white",
              border: "none",
              padding: "12px 24px",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Start Interview
          </button>
        </Link>
      </div>

      {/* Recent Interviews */}
      <div
        style={{
          background: "#1e293b",
          padding: "30px",
          borderRadius: "15px",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>📋 Recent Interviews</h2>

        <tbody>
          {dashboard.recentInterviews.length === 0 ? (
            <tr>
              <td
                colSpan="3"
                style={{
                  padding: "20px",
                  textAlign: "center",
                  color: "#94a3b8",
                }}
              >
                No interviews yet.
              </td>
            </tr>
          ) : (
            dashboard.recentInterviews.map((item) => (
              <tr key={item._id}>
                <td style={{ padding: "12px 0" }}>{item.role}</td>
                <td>{item.score}</td>
                <td>{item.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </div>
    </div>
  );
}

export default Dashboard;
