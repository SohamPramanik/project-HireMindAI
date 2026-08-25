import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import API from "../services/api";

import "./InterviewPage.css";

function InterviewPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [interview, setInterview] = useState(null);

  const [questionIndex, setQuestionIndex] = useState(0);

  const [answer, setAnswer] = useState("");

  const [evaluation, setEvaluation] = useState(null);

  const [loading, setLoading] = useState(true);

  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState("");

  // ==========================================
  // LOAD INTERVIEW
  // ==========================================

  useEffect(() => {
    const loadInterview = async () => {
      try {
        setLoading(true);

        const res = await API.get(`/interview/${id}`);

        const data = res.data.interview;

        setInterview(data);

        setQuestionIndex(data.currentQuestion || 0);
      } catch (err) {
        console.error(err);

        setError(err.response?.data?.message || "Unable to load interview.");
      } finally {
        setLoading(false);
      }
    };

    loadInterview();
  }, [id]);

  // ==========================================
  // SUBMIT ANSWER
  // ==========================================

  const submitAnswer = async () => {
    if (!answer.trim()) {
      setError("Please write an answer before submitting.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      const res = await API.post(`/interview/${id}/answer`, {
        questionIndex,
        answer,
      });

      setEvaluation(res.data.evaluation);

      setInterview((prev) => ({
        ...prev,

        currentQuestion: res.data.interview.currentQuestion,

        totalScore: res.data.interview.totalScore,

        status: res.data.interview.status,
      }));
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message || "Unable to evaluate your answer.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ==========================================
  // NEXT QUESTION
  // ==========================================

  const nextQuestion = () => {
    if (!interview || questionIndex >= interview.questions.length - 1) {
      navigate(`/result/${id}`);
      return;
    }

    setQuestionIndex((prev) => prev + 1);

    setAnswer("");

    setEvaluation(null);

    setError("");
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="interview-loading">
        <div className="loader"></div>

        <p>Preparing your AI interview...</p>
      </div>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error && !interview) {
    return (
      <div className="interview-error">
        <h2>Something went wrong</h2>

        <p>{error}</p>

        <button onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  if (!interview) return null;

  const currentQuestion = interview.questions[questionIndex];

  const progress = ((questionIndex + 1) / interview.questions.length) * 100;

  return (
    <div className="interview-page">
      {/* HEADER */}

      <header className="interview-header">
        <div>
          <span className="interview-eyebrow">LIVE AI INTERVIEW</span>

          <h1>{interview.role}</h1>

          <p>{interview.difficulty} difficulty</p>
        </div>

        <div className="interview-score">
          <span>Current Score</span>

          <strong>{interview.totalScore.toFixed(1)}</strong>
        </div>
      </header>

      {/* PROGRESS */}

      <div className="progress-container">
        <div className="progress-info">
          <span>
            Question {questionIndex + 1} / {interview.questions.length}
          </span>

          <span>{Math.round(progress)}%</span>
        </div>

        <div className="progress-track">
          <div
            className="progress-bar"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>

      {/* QUESTION */}

      <main className="interview-content">
        <section className="question-card">
          <span className="question-number">
            QUESTION {String(questionIndex + 1).padStart(2, "0")}
          </span>

          <h2>{currentQuestion.question}</h2>

          {!evaluation && (
            <>
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type your answer here..."
                rows={9}
                disabled={submitting}
              />

              {error && <div className="answer-error">{error}</div>}

              <button
                className="submit-answer-btn"
                onClick={submitAnswer}
                disabled={submitting}
              >
                {submitting ? "AI is evaluating..." : "Submit Answer →"}
              </button>
            </>
          )}

          {/* EVALUATION */}

          {evaluation && (
            <div className="evaluation">
              <div className="score-box">
                <span>YOUR SCORE</span>

                <strong>
                  {evaluation.score}
                  <small>/10</small>
                </strong>
              </div>

              <div className="feedback-section">
                <h3>AI Feedback</h3>

                <p>{evaluation.feedback}</p>
              </div>

              {evaluation.strengths?.length > 0 && (
                <div className="feedback-list">
                  <h3>Strengths</h3>

                  <ul>
                    {evaluation.strengths.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {evaluation.weaknesses?.length > 0 && (
                <div className="feedback-list">
                  <h3>Areas to Improve</h3>

                  <ul>
                    {evaluation.weaknesses.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {evaluation.improvements?.length > 0 && (
                <div className="feedback-list">
                  <h3>How to Improve</h3>

                  <ul>
                    {evaluation.improvements.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              <button className="next-question-btn" onClick={nextQuestion}>
                {questionIndex === interview.questions.length - 1
                  ? "View Final Results →"
                  : "Next Question →"}
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default InterviewPage;
