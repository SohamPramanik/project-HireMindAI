import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./InterviewSetup.css";

function InterviewSetup() {
  const navigate = useNavigate();

  const [role, setRole] = useState("");
  const [level, setLevel] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleStart = async () => {
    if (!role || !level) {
      setError("Please select both a role and difficulty level.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await API.post("/interview", {
        role,
        difficulty: level,
      });

      const interviewId = res.data.interview._id;

      navigate(`/interview/${interviewId}`);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Unable to create interview. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="interview-setup">
      <div className="setup-card">
        <div className="setup-header">
          <span className="setup-eyebrow">AI INTERVIEW SIMULATOR</span>

          <h1>
            Build your
            <span> interview.</span>
          </h1>

          <p>
            Choose your target role and difficulty. HireMind will generate a
            personalized technical interview using AI.
          </p>
        </div>

        <div className="setup-form">
          <div className="field">
            <label htmlFor="role">Interview Role</label>

            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">Select your role</option>

              <option value="Backend Developer">Backend Developer</option>

              <option value="Frontend Developer">Frontend Developer</option>

              <option value="Full Stack Developer">Full Stack Developer</option>

              <option value="MERN Stack Developer">MERN Stack Developer</option>

              <option value="Java Developer">Java Developer</option>

              <option value="Python Developer">Python Developer</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="difficulty">Difficulty</label>

            <select
              id="difficulty"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value="">Select difficulty</option>

              <option value="Beginner">Beginner</option>

              <option value="Intermediate">Intermediate</option>

              <option value="Advanced">Advanced</option>
            </select>
          </div>

          {error && <div className="setup-error">{error}</div>}

          <button
            className="generate-btn"
            onClick={handleStart}
            disabled={loading}
          >
            {loading ? "Generating interview..." : "Generate AI Interview →"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default InterviewSetup;
