import { useState } from "react";
import { Link } from "react-router-dom";

function InterviewPage() {
  const questions = [
    {
      question: "Explain REST API.",
    },
    {
      question: "What is JWT?",
    },
    {
      question: "Difference between SQL and NoSQL?",
    },
    {
      question: "Explain Node.js Event Loop.",
    },
    {
      question: "What is Middleware?",
    },
    {
      question: "Difference between Authentication and Authorization?",
    },
    {
      question: "Explain HTTP Status Codes.",
    },
    {
      question: "What is MongoDB?",
    },
    {
      question: "Difference between PUT and PATCH?",
    },
    {
      question: "What is Express.js?",
    },
  ];
  const [questionNo, setQuestionNo] = useState(1);

  const [answer, setAnswer] = useState("");

  const [submitted, setSubmitted] = useState(false);

  const submitAnswer = () => {
    if (!answer.trim()) {
      alert("Please enter an answer.");
      return;
    }

    // Backend API Later

    setSubmitted(true);
  };

  const nextQuestion = () => {
    if (questionNo === questions.length) return;

    setSubmitted(false);
    setAnswer("");
    setQuestionNo(questionNo + 1);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "40px",
      }}
    >
      <h1>🤖 AI Interview</h1>

      <p
        style={{
          color: "#94a3b8",
          marginBottom: "30px",
        }}
      >
        Question {questionNo} / 10
      </p>

      <div
        style={{
          background: "#1e293b",
          padding: "30px",
          borderRadius: "15px",
        }}
      >
        <h2>{questions[questionNo - 1].question}</h2>

        <textarea
          rows="8"
          placeholder="Write your answer here..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          style={{
            width: "100%",
            marginTop: "25px",
            padding: "15px",
            borderRadius: "10px",
            resize: "none",
            fontSize: "16px",
          }}
        />

        {!submitted ? (
          <button
            onClick={submitAnswer}
            style={{
              marginTop: "20px",
              padding: "14px 30px",
              background: "#6366f1",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            Submit Answer
          </button>
        ) : (
          <>
            <div
              style={{
                marginTop: "35px",
                background: "#111827",
                padding: "20px",
                borderRadius: "10px",
              }}
            >
              <h3>⭐ Score : 8 / 10</h3>

              <br />

              <h3>💬 AI Feedback</h3>

              <p
                style={{
                  color: "#cbd5e1",
                }}
              >
                Great explanation. You correctly described JWT. You can also
                mention Refresh Tokens.
              </p>

              <br />

              <h3>📚 Ideal Answer</h3>

              <p
                style={{
                  color: "#cbd5e1",
                }}
              >
                JWT (JSON Web Token) is a secure token used for authentication
                between client and server. It contains Header, Payload and
                Signature.
              </p>
            </div>

            <button
              onClick={nextQuestion}
              style={{
                marginTop: "20px",
                padding: "14px 30px",
                background: "#22c55e",
                color: "white",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
              }}
            >
              Next Question →
            </button>
          </>
        )}
      </div>

      <div
        style={{
          marginTop: "30px",
        }}
      >
        <Link to="/result/1">
          <button
            style={{
              background: "#ef4444",
              color: "white",
              padding: "14px 30px",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            Finish Interview
          </button>
        </Link>
      </div>
    </div>
  );
}

export default InterviewPage;
