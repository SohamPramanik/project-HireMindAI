import "./Home.css";
import { Link } from "react-router-dom";
import { Bot, TrendingUp, Target, ArrowRight } from "lucide-react";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <div className="home">
      <Navbar />

      {/* ================= HERO ================= */}

      <section className="hero">
        <div className="hero-left">
          <span className="tag">AI-Powered Interview Practice</span>

          <h1>
            Prepare with precision.
            <br />
            Interview with <span>confidence.</span>
          </h1>

          <p>
            HireMind runs realistic, role-specific technical interviews,
            scores every answer, and shows you exactly what to improve —
            so the next offer is the one you take.
          </p>

          <div className="hero-buttons">
            <Link to="/register">
              <button className="primaryBtn">
                Start practicing <ArrowRight size={18} />
              </button>
            </Link>

            <Link to="/login">
              <button className="secondaryBtn">Sign in</button>
            </Link>
          </div>
        </div>

        <div className="hero-right">
          <div className="glass-card">
            <h3>Backend Developer</h3>

            <p>Question 3 of 10</p>

            <div className="progress">
              <div className="progressFill"></div>
            </div>

            <h4>Explain how a REST API works.</h4>

            <button className="answerBtn">Recording your answer…</button>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}

      <section id="features" className="features">
        <h2>Built for serious preparation</h2>

        <div className="cards">
          <div className="card">
            <Bot size={34} strokeWidth={1.5} />
            <h3>AI interviewer</h3>
            <p>
              Realistic, role-specific interview questions generated and
              adapted to your responses in real time.
            </p>
          </div>

          <div className="card">
            <TrendingUp size={34} strokeWidth={1.5} />
            <h3>Performance analysis</h3>
            <p>
              A detailed score and breakdown after every session, so you
              know precisely what to work on next.
            </p>
          </div>

          <div className="card">
            <Target size={34} strokeWidth={1.5} />
            <h3>Role-based practice</h3>
            <p>
              Backend, frontend, full-stack, DevOps and more — practice for
              the role you're actually interviewing for.
            </p>
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}

      <section id="stats" className="stats">
        <div className="statCard">
          <h2>10,000+</h2>
          <p>Mock interviews completed</p>
        </div>

        <div className="statCard">
          <h2>95%</h2>
          <p>User satisfaction</p>
        </div>

        <div className="statCard">
          <h2>50+</h2>
          <p>Interview roles covered</p>
        </div>

        <div className="statCard">
          <h2>24/7</h2>
          <p>Available whenever you are</p>
        </div>
      </section>

      {/* ================= HOW ================= */}

      <section id="how" className="how">
        <h2>How HireMind works</h2>

        <div className="steps">
          <div className="step">
            <span>1</span>
            <h3>Select your role</h3>
            <p>Choose your track and set the difficulty level.</p>
          </div>

          <div className="step">
            <span>2</span>
            <h3>Get your questions</h3>
            <p>Receive a set of realistic, role-specific interview questions.</p>
          </div>

          <div className="step">
            <span>3</span>
            <h3>Answer live</h3>
            <p>Respond under the same conditions as a real interview.</p>
          </div>

          <div className="step">
            <span>4</span>
            <h3>Review your feedback</h3>
            <p>See your score, where you fell short, and how to improve.</p>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}

      <section className="cta">
        <h2>Your next interview starts here.</h2>

        <p>Unlimited practice interviews, whenever you're ready.</p>

        <Link to="/register">
          <button className="primaryBtn">
            Start now <ArrowRight size={18} />
          </button>
        </Link>
      </section>

      {/* ================= FOOTER ================= */}

      <footer>
        <h2>HireMind</h2>

        <p>AI-driven interview preparation for serious candidates.</p>

        <p className="copy">© 2026 HireMind. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;