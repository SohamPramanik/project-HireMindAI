import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../context/AuthContext";
import API from "../services/api";

import "./Dashboard.css";

function Dashboard() {
  const { user, logout } = useContext(AuthContext);

  const [dashboard, setDashboard] = useState({
    totalInterviews: 0,
    averageScore: 0,
    completed: 0,
    pending: 0,
    recentInterviews: [],
  });

  const [loading, setLoading] = useState(true);
  const [dashboardError, setDashboardError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setDashboardError("");

        const res = await API.get("/interview/dashboard");

        setDashboard(res.data);
      } catch (error) {
        console.error("Dashboard loading error:", error);

        setDashboardError(
          error.response?.data?.message || "Failed to load dashboard data.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");

    if (confirmed) {
      logout();
    }
  };

  return (
    <div className="dashboard">
      {/* =========================
          HEADER
      ========================== */}
      <header className="dashboard-header">
        <div>
          <p className="dashboard-eyebrow">YOUR INTERVIEW HUB</p>

          <h1>
            Welcome back, <span>{user ? user.name : "Guest"}</span>
          </h1>

          <p className="dashboard-subtitle">
            Track your interview progress, sharpen your skills, and prepare
            smarter with AI.
          </p>
        </div>

        <div className="header-actions">
          <Link to="/interview/setup" className="header-action">
            <span>＋</span>
            New Interview
          </Link>

          <button type="button" className="logout-btn" onClick={handleLogout}>
            <span>↪</span>
            Logout
          </button>
        </div>
      </header>

      {/* =========================
          STATS
      ========================== */}
      <section className="stats">
        <div className="stat-card">
          <div className="stat-top">
            <div className="stat-icon purple">
              <span>◎</span>
            </div>

            <span className="stat-label">ALL TIME</span>
          </div>

          <h2>{dashboard.totalInterviews}</h2>

          <p>Total Interviews</p>

          <div className="stat-footer">
            <span className="stat-neutral">Interview sessions</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <div className="stat-icon blue">
              <span>↗</span>
            </div>

            <span className="stat-label">PERFORMANCE</span>
          </div>

          <h2>
            {Math.round(dashboard.averageScore * 10)}
            <small>%</small>
          </h2>

          <p>Average Score</p>

          <div className="stat-footer">
            <span className="stat-neutral">Overall performance</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <div className="stat-icon green">
              <span>✓</span>
            </div>

            <span className="stat-label">FINISHED</span>
          </div>

          <h2>{dashboard.completed}</h2>

          <p>Completed</p>

          <div className="stat-footer">
            <span className="stat-positive">● Completed sessions</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <div className="stat-icon orange">
              <span>◷</span>
            </div>

            <span className="stat-label">UP NEXT</span>
          </div>

          <h2>{dashboard.pending}</h2>

          <p>Pending</p>

          <div className="stat-footer">
            <span className="stat-warning">● Needs attention</span>
          </div>
        </div>
      </section>

      {/* =========================
          MAIN GRID
      ========================== */}
      <section className="dashboard-grid">
        {/* =========================
            START INTERVIEW
        ========================== */}
        <div className="start-card">
          <div className="start-content">
            <span className="start-badge">AI POWERED</span>

            <h2>
              Ready for your
              <br />
              next interview?
            </h2>

            <p>
              Practice with personalized AI-generated questions based on your
              skills, experience, and target role.
            </p>

            <Link to="/interview/setup" className="start-btn">
              Start Interview
              <span>→</span>
            </Link>
          </div>

          <div className="start-visual">
            <div className="visual-glow"></div>

            <div className="ai-orbit orbit-one"></div>
            <div className="ai-orbit orbit-two"></div>

            <div className="ai-core">
              <span>AI</span>
            </div>

            <div className="floating-card floating-card-one">
              <span className="mini-icon">✓</span>
              <div>
                <strong>AI Feedback</strong>
                <small>Instant analysis</small>
              </div>
            </div>

            <div className="floating-card floating-card-two">
              <span className="mini-icon">✦</span>
              <div>
                <strong>Smart Questions</strong>
                <small>Personalized for you</small>
              </div>
            </div>
          </div>
        </div>

        {/* =========================
            QUICK ACTIONS
        ========================== */}
        <div className="quick-card">
          <div className="section-heading">
            <div>
              <span className="section-eyebrow">QUICK ACCESS</span>
              <h3>Keep practicing</h3>
            </div>
          </div>

          <Link to="/interview/setup" className="quick-item">
            <div className="quick-icon purple">
              <span>✦</span>
            </div>

            <div>
              <strong>AI Interview</strong>
              <p>Start a personalized session</p>
            </div>

            <span className="quick-arrow">→</span>
          </Link>

          <Link to="/interview/setup" className="quick-item">
            <div className="quick-icon blue">
              <span>⌁</span>
            </div>

            <div>
              <strong>Practice Skills</strong>
              <p>Improve your technical answers</p>
            </div>

            <span className="quick-arrow">→</span>
          </Link>

          <div className="quick-item disabled">
            <div className="quick-icon green">
              <span>▣</span>
            </div>

            <div>
              <strong>Resume Analysis</strong>
              <p>ATS optimization coming soon</p>
            </div>

            <span className="coming-soon">Soon</span>
          </div>
        </div>
      </section>

      {/* =========================
          RECENT INTERVIEWS
      ========================== */}
      <section className="recent-section">
        <div className="recent-header">
          <div>
            <span className="section-eyebrow">ACTIVITY</span>

            <h2>Recent Interviews</h2>

            <p>Review your latest interview sessions and performance.</p>
          </div>

          {dashboard.recentInterviews.length > 0 && (
            <Link to="/interviews" className="view-all">
              View all →
            </Link>
          )}
        </div>

        {dashboard.recentInterviews.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              <span>◌</span>
            </div>

            <h3>No interviews yet</h3>

            <p>
              Your completed interviews will appear here. Start your first
              AI-powered session to begin tracking your progress.
            </p>

            <Link to="/interview/setup" className="empty-btn">
              Start your first interview
              <span>→</span>
            </Link>
          </div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>ROLE</th>
                  <th>SCORE</th>
                  <th>STATUS</th>
                  <th>DATE</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {dashboard.recentInterviews.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <div className="role-cell">
                        <div className="role-avatar">
                          {item.role?.charAt(0) || "I"}
                        </div>

                        <strong>{item.role}</strong>
                      </div>
                    </td>

                    <td>
                      <span className="score">
                        {Math.round(item.score * 10)}%
                      </span>
                    </td>

                    <td>
                      <span
                        className={
                          item.status === "completed"
                            ? "status completed"
                            : "status pending"
                        }
                      >
                        {item.status}
                      </span>
                    </td>

                    <td>
                      <span className="date">
                        {item.date
                          ? new Date(item.date).toLocaleDateString("en-IN", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })
                          : "—"}
                      </span>
                    </td>

                    <td>
                      <button className="row-action">→</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

export default Dashboard;
