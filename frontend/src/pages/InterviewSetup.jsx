import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./InterviewSetup.css";

function InterviewSetup() {
  const navigate = useNavigate();

  const [role, setRole] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleStart = async (e) => {
    e.preventDefault();

    if (!role || !difficulty) {
      setError("Please select both topic and difficulty.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await API.post("/interview", {
        role,
        difficulty,
      });

      console.log("Interview created:", res.data);

      const interviewId = res.data.interview._id;

      navigate(`/interview/${interviewId}`);
    } catch (err) {
      console.error("Interview creation error:", err);

      setError(
        err.response?.data?.message ||
          "Failed to create interview. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="interview-setup-page">
      <section className="interview-setup-wrapper">

        {/* HEADER */}
        <div className="interview-setup-header">
          <div className="interview-setup-eyebrow">
            <span></span>
            AI INTERVIEW SIMULATOR
          </div>

          <h1>
            Build your <strong>interview.</strong>
          </h1>

          <p>
            Choose your technical topic and difficulty. HireMind will
            generate a personalized interview using AI.
          </p>
        </div>

        {/* CARD */}
        <div className="interview-setup-card">
          <form onSubmit={handleStart}>

            {/* TOPIC */}
            <div className="interview-setup-field">
              <label htmlFor="role">Interview Topic</label>

              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Select your topic</option>

                <option value="Backend">
                  Backend
                </option>

                <option value="Frontend">
                  Frontend
                </option>

                <option value="Java">
                  Java
                </option>

                <option value="C++">
                  C++
                </option>

                <option value="Python">
                  Python
                </option>

                <option value="AI/ML">
                  AI / ML
                </option>

                <option value="SQL">
                  SQL
                </option>

                <option value="MongoDB">
                  MongoDB
                </option>

                <option value="Blockchain">
                  Blockchain
                </option>
              </select>
            </div>

            {/* DIFFICULTY */}
            <div className="interview-setup-field">
              <label htmlFor="difficulty">
                Difficulty
              </label>

              <select
                id="difficulty"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <option value="">
                  Select difficulty
                </option>

                <option value="Beginner">
                  Beginner
                </option>

                <option value="Intermediate">
                  Intermediate
                </option>

                <option value="Advanced">
                  Advanced
                </option>
              </select>
            </div>

            {/* ERROR */}
            {error && (
              <div className="interview-setup-error">
                {error}
              </div>
            )}

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="interview-setup-button"
            >
              {loading ? (
                "Generating interview..."
              ) : (
                <>
                  Generate AI Interview
                  <span>→</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* FEATURES */}
        <div className="interview-setup-features">
          <div>
            <span>✓</span>
            AI-generated questions
          </div>

          <div>
            <span>✓</span>
            Topic-specific interview
          </div>

          <div>
            <span>✓</span>
            Instant AI evaluation
          </div>
        </div>

      </section>
    </main>
  );
}

export default InterviewSetup;