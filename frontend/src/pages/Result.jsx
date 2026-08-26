import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CheckCircle2, XCircle, ArrowRight, RotateCcw } from "lucide-react";

import API from "../services/api";

import "./Result.css";

function Result() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  // =====================================================
  // LOAD INTERVIEW RESULT
  // =====================================================

  useEffect(() => {
    const loadResult = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await API.get(`/interview/${id}`);

        setInterview(res.data.interview);
      } catch (err) {
        console.error("Load result error:", err);

        setError(
          err.response?.data?.message ||
            "Unable to load your interview results.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadResult();
  }, [id]);

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="result-loading">
        <div className="result-loader"></div>

        <h2>Preparing your results...</h2>

        <p>We're putting together your AI interview report.</p>
      </div>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error || !interview) {
    return (
      <div className="result-error">
        <div className="result-error-icon">!</div>

        <h2>Unable to load results</h2>

        <p>{error || "Interview results could not be found."}</p>

        <button type="button" onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  // =====================================================
  // CALCULATIONS
  // =====================================================

  const questions = interview.questions || [];

  const totalQuestions = questions.length;

  const answeredQuestions = questions.filter(
    (question) => typeof question.score === "number",
  );

  const answeredCount = answeredQuestions.length;

  const averageScore =
    answeredCount > 0
      ? answeredQuestions.reduce(
          (sum, question) => sum + Number(question.score || 0),
          0,
        ) / answeredCount
      : Number(interview.totalScore || 0);

  const percentage = Math.round((averageScore / 10) * 100);

  const roundedScore = Number(averageScore || 0).toFixed(1);

  // =====================================================
  // PERFORMANCE MESSAGE
  // =====================================================

  const getPerformance = () => {
    if (averageScore >= 9) {
      return {
        title: "Outstanding Performance",
        description:
          "Excellent technical understanding. Your answers demonstrated strong confidence and depth.",
        className: "excellent",
      };
    }

    if (averageScore >= 8) {
      return {
        title: "Excellent Performance",
        description:
          "You demonstrated strong technical knowledge with mostly accurate and well-structured answers.",
        className: "excellent",
      };
    }

    if (averageScore >= 7) {
      return {
        title: "Good Performance",
        description:
          "You have a solid understanding of the subject, with a few areas that can be strengthened.",
        className: "good",
      };
    }

    if (averageScore >= 5) {
      return {
        title: "Room for Improvement",
        description:
          "You have a foundation to build on. Focus on the weaker concepts and practice explaining them clearly.",
        className: "average",
      };
    }

    return {
      title: "Keep Practicing",
      description:
        "This interview highlighted several areas where additional preparation and practice can help.",
      className: "needs-work",
    };
  };

  const performance = getPerformance();

  // =====================================================
  // TOGGLE QUESTION
  // =====================================================

  const toggleQuestion = (index) => {
    setExpandedQuestion(expandedQuestion === index ? null : index);
  };

  return (
    <main className="result-page">
      {/* =================================================
          TOP NAVIGATION
      ================================================= */}

      <header className="result-topbar">
        <button
          type="button"
          className="result-back"
          onClick={() => navigate("/dashboard")}
        >
          ← Dashboard
        </button>

        <div className="result-brand">
          <div className="result-brand-icon">H</div>

          <span>
            HireMind <b>AI</b>
          </span>
        </div>
      </header>

      {/* =================================================
          HERO
      ================================================= */}

      <section className="result-hero">
        <div className="result-complete-badge">
          <CheckCircle2 size={15} />
          INTERVIEW COMPLETED
        </div>

        <h1>Your Interview Results</h1>

        <p className="result-hero-description">
          Here's a detailed breakdown of your performance.
        </p>

        <div className="result-meta">
          <span>{interview.role}</span>
          <span className="meta-dot">•</span>
          <span>{interview.difficulty}</span>
          <span className="meta-dot">•</span>
          <span>{totalQuestions} Questions</span>
        </div>
      </section>

      {/* =================================================
          SCORE CARD
      ================================================= */}

      <section className="result-score-card">
        <div className="score-visual">
          <div
            className={`score-ring ${performance.className}`}
            style={{
              "--score-progress": `${percentage}%`,
            }}
          >
            <div className="score-ring-inner">
              <strong>{roundedScore}</strong>
              <span>/ 10</span>
            </div>
          </div>
        </div>

        <div className="score-content">
          <span className="score-label">OVERALL SCORE</span>

          <h2>{performance.title}</h2>

          <p>{performance.description}</p>

          <div className="score-progress">
            <div className="score-progress-header">
              <span>Overall performance</span>
              <strong>{percentage}%</strong>
            </div>

            <div className="score-progress-track">
              <div
                className={`score-progress-bar ${performance.className}`}
                style={{
                  width: `${percentage}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          QUICK STATS
      ================================================= */}

      <section className="result-stats">
        <div className="result-stat">
          <span className="result-stat-icon purple">#</span>

          <div>
            <strong>{totalQuestions}</strong>
            <span>Total Questions</span>
          </div>
        </div>

        <div className="result-stat">
          <span className="result-stat-icon blue">✓</span>

          <div>
            <strong>{answeredCount}</strong>
            <span>Answered</span>
          </div>
        </div>

        <div className="result-stat">
          <span className="result-stat-icon green">★</span>

          <div>
            <strong>{roundedScore}</strong>
            <span>Average Score</span>
          </div>
        </div>

        <div className="result-stat">
          <span className="result-stat-icon orange">%</span>

          <div>
            <strong>{percentage}%</strong>
            <span>Performance</span>
          </div>
        </div>
      </section>

      {/* =================================================
          QUESTION RESULTS
      ================================================= */}

      <section className="question-results">
        <div className="results-section-header">
          <div>
            <span className="results-eyebrow">DETAILED BREAKDOWN</span>

            <h2>Question Results</h2>

            <p>Review how you performed on every question.</p>
          </div>
        </div>

        <div className="question-list">
          {questions.map((question, index) => {
            const score = Number(question.score || 0);

            const isExpanded = expandedQuestion === index;

            const isGood = score >= 7;

            return (
              <div
                className={`result-question ${isExpanded ? "expanded" : ""}`}
                key={question._id || index}
              >
                {/* QUESTION HEADER */}

                <button
                  type="button"
                  className="result-question-header"
                  onClick={() => toggleQuestion(index)}
                >
                  <div className="question-left">
                    <div
                      className={`question-status ${
                        isGood ? "positive" : "negative"
                      }`}
                    >
                      {isGood ? (
                        <CheckCircle2 size={17} />
                      ) : (
                        <XCircle size={17} />
                      )}
                    </div>

                    <div className="question-title">
                      <span>QUESTION {String(index + 1).padStart(2, "0")}</span>

                      <strong>{question.question}</strong>
                    </div>
                  </div>

                  <div className="question-score">
                    <strong>{score}</strong>

                    <span>/10</span>

                    <span
                      className={`question-chevron ${isExpanded ? "open" : ""}`}
                    >
                      ↓
                    </span>
                  </div>
                </button>

                {/* EXPANDED CONTENT */}

                {isExpanded && (
                  <div className="question-details">
                    {/* YOUR ANSWER */}

                    <div className="detail-block">
                      <span className="detail-label">YOUR ANSWER</span>

                      <div className="your-answer">
                        {question.answer || "No answer provided."}
                      </div>
                    </div>

                    {/* FEEDBACK */}

                    {question.feedback && (
                      <div className="detail-block">
                        <span className="detail-label">AI FEEDBACK</span>

                        <p className="detail-text">{question.feedback}</p>
                      </div>
                    )}

                    {/* TWO COLUMN */}

                    <div className="detail-grid">
                      {question.strengths?.length > 0 && (
                        <div className="detail-box strengths">
                          <h4>
                            <CheckCircle2 size={16} />
                            What You Did Well
                          </h4>

                          <ul>
                            {question.strengths.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {question.weaknesses?.length > 0 && (
                        <div className="detail-box weaknesses">
                          <h4>
                            <XCircle size={16} />
                            Areas to Improve
                          </h4>

                          <ul>
                            {question.weaknesses.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* IMPROVEMENTS */}

                    {question.improvements?.length > 0 && (
                      <div className="detail-box improvements">
                        <h4>
                          <ArrowRight size={16} />
                          How You Can Improve
                        </h4>

                        <ul>
                          {question.improvements.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* IDEAL ANSWER */}

                    {question.idealAnswer && (
                      <div className="ideal-answer-box">
                        <span className="detail-label">MODEL ANSWER</span>

                        <h4>A stronger answer would be:</h4>

                        <p>{question.idealAnswer}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* =================================================
          BOTTOM ACTIONS
      ================================================= */}

      <section className="result-actions">
        <button
          type="button"
          className="dashboard-result-btn"
          onClick={() => navigate("/dashboard")}
        >
          Back to Dashboard
        </button>

        <button
          type="button"
          className="new-interview-result-btn"
          onClick={() => navigate("/interview/setup")}
        >
          <RotateCcw size={16} />
          New Interview
        </button>
      </section>
    </main>
  );
}

export default Result;
