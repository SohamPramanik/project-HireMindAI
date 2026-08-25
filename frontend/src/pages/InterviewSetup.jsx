import { useState } from "react";
import { useNavigate } from "react-router-dom";

function InterviewSetup() {
  const navigate = useNavigate();

  const [role, setRole] = useState("");
  const [level, setLevel] = useState("");

  const handleStart = () => {
    if (!role || !level) {
      alert("Please select both Role and Difficulty");
      return;
    }

    // Backend API will be connected later
    console.log(role, level);

    navigate(`/interview/${res.data.interview._id}`);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "#1e293b",
          padding: "40px",
          borderRadius: "20px",
          width: "450px",
        }}
      >
        <h1 style={{ marginBottom: "25px" }}>🚀 Start AI Interview</h1>

        <label>Interview Role</label>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "10px",
            marginBottom: "25px",
            borderRadius: "10px",
          }}
        >
          <option value="">Select Role</option>
          <option>Backend Developer</option>
          <option>Frontend Developer</option>
          <option>Full Stack Developer</option>
          <option>MERN Stack Developer</option>
          <option>Java Developer</option>
          <option>Python Developer</option>
        </select>

        <label>Difficulty</label>

        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "10px",
            marginBottom: "30px",
            borderRadius: "10px",
          }}
        >
          <option value="">Select Difficulty</option>
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>

        <button
          onClick={handleStart}
          style={{
            width: "100%",
            padding: "15px",
            background: "#6366f1",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          Generate AI Interview
        </button>
      </div>
    </div>
  );
}

export default InterviewSetup;
