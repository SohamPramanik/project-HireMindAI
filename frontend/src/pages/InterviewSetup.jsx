import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function InterviewSetup() {
  const navigate = useNavigate();

  const [role, setRole] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleStart = async (e) => {
    e.preventDefault();

    if (!role || !difficulty) {
      setError("Please select both role and difficulty.");
      return;
    }

    try {
      setError("");
      setLoading(true);

      const res = await API.post("/interview", {
        role,
        difficulty,
      });

      console.log("Interview created:", res.data);

      const interviewId = res.data.interview._id;

      navigate(`/interview/${interviewId}`);
    } catch (err) {
      console.error("Create interview error:", err);

      setError(
        err.response?.data?.message ||
          "Failed to create interview. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="setup-page">
      <div className="setup-container">
        <div className="setup-header">
          <span className="eyebrow">AI INTERVIEW SIMULATOR</span>

          <h1>
            Build your <span className="gradient">interview.</span>
          </h1>

          <p>
            Choose your target role and difficulty. HireMind will generate a
            personalized technical interview using AI.
          </p>
        </div>

        <div className="setup-card">
          <form onSubmit={handleStart}>
            <div className="setup-field">
              <label htmlFor="role">Interview Role</label>

              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="setup-select"
              >
                <option value="">Select your role</option>
                <option value="Backend Developer">Backend Developer</option>
                <option value="Frontend Developer">Frontend Developer</option>
                <option value="Full Stack Developer">
                  Full Stack Developer
                </option>
                <option value="MERN Stack Developer">
                  MERN Stack Developer
                </option>
                <option value="Java Developer">Java Developer</option>
                <option value="Python Developer">Python Developer</option>
              </select>
            </div>

            <div className="setup-field">
              <label htmlFor="difficulty">Difficulty</label>

              <select
                id="difficulty"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="setup-select"
              >
                <option value="">Select difficulty</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            {error && (
              <div className="setup-error" role="alert">
                {error}
              </div>
            )}

            <button type="submit" className="setup-button" disabled={loading}>
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

        <div className="setup-features">
          <div>
            <span>✦</span>
            AI-generated questions
          </div>

          <div>
            <span>✦</span>
            Difficulty-based interview
          </div>

          <div>
            <span>✦</span>
            Instant AI evaluation
          </div>
        </div>
      </div>
    </div>
  );
}

export default InterviewSetup;
