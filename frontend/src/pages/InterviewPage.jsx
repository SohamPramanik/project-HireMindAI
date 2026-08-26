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

  // =====================================================
  // LOAD INTERVIEW
  // =====================================================

  useEffect(() => {
    const loadInterview = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await API.get(`/interview/${id}`);

        const data = res.data.interview;

        setInterview(data);
        setQuestionIndex(data.currentQuestion || 0);
      } catch (err) {
        console.error("Load interview error:", err);

        setError(
          err.response?.data?.message || "Unable to load interview."
        );
      } finally {
        setLoading(false);
      }
    };

    loadInterview();
  }, [id]);

  // =====================================================
  // SUBMIT ANSWER
  // =====================================================

  const submitAnswer = async () => {
    if (!answer.trim()) {
      setError("Please write an answer before submitting.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");
      setEvaluation(null);

      const res = await API.post(`/interview/${id}/answer`, {
        questionIndex,
        answer: answer.trim(),
      });

      // Store AI evaluation
      setEvaluation(res.data.evaluation);

      // Update interview data
      setInterview((prev) => ({
        ...prev,
        currentQuestion: res.data.interview.currentQuestion,
        totalScore: res.data.interview.totalScore,
        status: res.data.interview.status,
        questions: res.data.interview.questions,
      }));
    } catch (err) {
      console.error("Submit answer error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to evaluate your answer."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // =====================================================
  // NEXT QUESTION
  // =====================================================

  const nextQuestion = () => {
    if (!interview) return;

    const lastQuestion =
      questionIndex >= interview.questions.length - 1;

    if (lastQuestion) {
      navigate(`/result/${id}`);
      return;
    }

    setQuestionIndex((prev) => prev + 1);
    setAnswer("");
    setEvaluation(null);
    setError("");
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="interview-loading">
        <div className="loader"></div>
        <p>Preparing your AI interview...</p>
      </div>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

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

  if (!interview) {
    return null;
  }

  const currentQuestion = interview.questions[questionIndex];

  if (!currentQuestion) {
    return (
      <div className="interview-error">
        <h2>Question not found</h2>

        <button onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  // =====================================================
  // PROGRESS CALCULATION
  // =====================================================

  const totalQuestions = interview.questions.length;

  const currentQuestionNumber = questionIndex + 1;

  const progress =
    totalQuestions > 0
      ? (currentQuestionNumber / totalQuestions) * 100
      : 0;

  // Safety: make sure percentage is always between 0 and 100
  const progressPercentage = Math.min(
    100,
    Math.max(0, progress)
  );

  return (
    <div className="interview-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <header className="interview-header">

        <div className="interview-title">

          <span className="interview-eyebrow">
            LIVE AI INTERVIEW
          </span>

          <h1>{interview.role}</h1>

          <p>{interview.difficulty} difficulty</p>

        </div>

        <div className="interview-score">

          <span>Current Score</span>

          <strong>
            {Number(interview.totalScore || 0).toFixed(1)}
          </strong>

          <small>/ 10</small>

        </div>

      </header>

      {/* =================================================
          PROGRESS
      ================================================= */}

      <div className="interview-progress">

        <div className="interview-progress-info">

          <span>
            Question {currentQuestionNumber} / {totalQuestions}
          </span>

          <span>
            {Math.round(progressPercentage)}%
          </span>

        </div>

        <div className="interview-progress-track">

          <div
            className="interview-progress-fill"
            style={{
              width: `${progressPercentage}%`,
            }}
          />

        </div>

      </div>

      {/* =================================================
          QUESTION
      ================================================= */}

      <main className="interview-content">

        <section className="question-card">

          <span className="question-number">
            QUESTION{" "}
            {String(currentQuestionNumber).padStart(2, "0")}
          </span>

          <h2>{currentQuestion.question}</h2>

          {/* =================================================
              ANSWER AREA
          ================================================= */}

          {!evaluation && (
            <div className="answer-area">

              <label htmlFor="answer">
                Your Answer
              </label>

              <textarea
                id="answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Explain your answer clearly. Include examples, reasoning, and technical details where appropriate..."
                rows={10}
                disabled={submitting}
              />

              {error && (
                <div className="answer-error">
                  {error}
                </div>
              )}

              <div className="answer-actions">

                <span className="answer-hint">
                  Take your time. Your answer will be evaluated by AI.
                </span>

                <button
                  type="button"
                  className="submit-answer-btn"
                  onClick={submitAnswer}
                  disabled={submitting}
                >
                  {submitting
                    ? "AI is evaluating..."
                    : "Submit Answer →"}
                </button>

              </div>

            </div>
          )}

          {/* =================================================
              AI EVALUATION
          ================================================= */}

          {evaluation && (
            <div className="evaluation">

              {/* SCORE */}

              <div className="evaluation-header">

                <div>

                  <span className="evaluation-eyebrow">
                    AI EVALUATION
                  </span>

                  <h3>
                    Here's how you performed
                  </h3>

                </div>

                <div className="evaluation-score">

                  <strong>
                    {evaluation.score}
                  </strong>

                  <span>/10</span>

                </div>

              </div>

              {/* FEEDBACK */}

              <div className="evaluation-section feedback-section">

                <h3>Overall Feedback</h3>

                <p>{evaluation.feedback}</p>

              </div>

              {/* STRENGTHS */}

              {evaluation.strengths?.length > 0 && (
                <div className="evaluation-section evaluation-positive">

                  <h3>
                    ✓ What You Did Well
                  </h3>

                  <ul>
                    {evaluation.strengths.map(
                      (item, index) => (
                        <li key={index}>{item}</li>
                      )
                    )}
                  </ul>

                </div>
              )}

              {/* WEAKNESSES */}

              {evaluation.weaknesses?.length > 0 && (
                <div className="evaluation-section evaluation-negative">

                  <h3>
                    ✕ Mistakes / Areas to Improve
                  </h3>

                  <ul>
                    {evaluation.weaknesses.map(
                      (item, index) => (
                        <li key={index}>{item}</li>
                      )
                    )}
                  </ul>

                </div>
              )}

              {/* IMPROVEMENTS */}

              {evaluation.improvements?.length > 0 && (
                <div className="evaluation-section">

                  <h3>
                    → How You Can Improve
                  </h3>

                  <ul>
                    {evaluation.improvements.map(
                      (item, index) => (
                        <li key={index}>{item}</li>
                      )
                    )}
                  </ul>

                </div>
              )}

              {/* IDEAL ANSWER */}

              {evaluation.idealAnswer && (
                <div className="ideal-answer">

                  <div className="ideal-answer-header">

                    <span>
                      MODEL ANSWER
                    </span>

                  </div>

                  <h3>
                    A stronger answer would be:
                  </h3>

                  <p>
                    {evaluation.idealAnswer}
                  </p>

                </div>
              )}

              {/* NEXT QUESTION */}

              <div className="next-question-wrapper">

                <button
                  type="button"
                  className="next-question-btn"
                  onClick={nextQuestion}
                >
                  {questionIndex ===
                  interview.questions.length - 1
                    ? "View Final Results →"
                    : "Next Question →"}
                </button>

              </div>

            </div>
          )}

        </section>

      </main>

    </div>
  );
}

export default InterviewPage;