import "./Home.css";
import { Link } from "react-router-dom";
import {
  Bot,
  TrendingUp,
  Target,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Brain,
  BarChart3,
  ShieldCheck,
} from "lucide-react";

import Navbar from "../components/NavBar";

function Home() {
  return (
    <div className="home">
      <Navbar />

      {/* =========================================
          HERO
      ========================================== */}

      <section className="hero">
        <div className="hero-background">
          <div className="hero-orb orb-one"></div>
          <div className="hero-orb orb-two"></div>
          <div className="hero-grid"></div>
        </div>

        <div className="hero-content">
          <div className="hero-left">
            <div className="hero-badge">
              <span className="badge-dot"></span>
              AI-POWERED INTERVIEW PREPARATION
            </div>

            <h1>
              Prepare smarter.
              <br />
              <span>Interview better.</span>
            </h1>

            <p>
              Practice realistic interviews, get personalized AI feedback, and
              build the confidence you need to perform at your best.
            </p>

            <div className="hero-buttons">
              <Link to="/register" className="primary-btn">
                Start practicing
                <ArrowRight size={17} />
              </Link>

              <Link to="/login" className="secondary-btn">
                Sign in
              </Link>
            </div>

            <div className="hero-trust">
              <div className="trust-item">
                <CheckCircle2 size={16} />
                <span>AI-generated questions</span>
              </div>

              <div className="trust-item">
                <CheckCircle2 size={16} />
                <span>Instant performance feedback</span>
              </div>
            </div>
          </div>

          {/* =====================================
              HERO PRODUCT PREVIEW
          ====================================== */}

          <div className="hero-right">
            <div className="dashboard-preview">
              <div className="preview-topbar">
                <div className="preview-brand">
                  <div className="preview-logo">H</div>

                  <span>HireMind AI</span>
                </div>

                <div className="preview-user">
                  <span></span>
                </div>
              </div>

              <div className="preview-body">
                <div className="preview-heading">
                  <div>
                    <span>LIVE INTERVIEW</span>
                    <h3>Backend Developer</h3>
                  </div>

                  <div className="live-indicator">
                    <span></span>
                    LIVE
                  </div>
                </div>

                <div className="question-progress">
                  <div className="question-meta">
                    <span>Question 3 of 10</span>
                    <strong>30%</strong>
                  </div>

                  <div className="preview-progress">
                    <div></div>
                  </div>
                </div>

                <div className="question-card">
                  <div className="question-label">
                    <Sparkles size={14} />
                    AI GENERATED
                  </div>

                  <h4>
                    Explain how a REST API works and how you would secure one.
                  </h4>

                  <div className="question-tags">
                    <span>Backend</span>
                    <span>Medium</span>
                  </div>
                </div>

                <div className="answer-area">
                  <div className="answer-header">
                    <span>Your answer</span>
                    <span className="recording">
                      <span></span>
                      Recording
                    </span>
                  </div>

                  <div className="answer-lines">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>

                <div className="preview-footer">
                  <div className="preview-time">02:41</div>

                  <button>
                    Submit answer
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>

              {/* Floating score card */}

              <div className="floating-score">
                <div className="score-icon">
                  <TrendingUp size={15} />
                </div>

                <div>
                  <span>AI Evaluation</span>
                  <strong>Excellent response</strong>
                </div>

                <div className="score-value">86%</div>
              </div>

              {/* Floating AI card */}

              <div className="floating-ai">
                <div className="ai-icon">
                  <Bot size={15} />
                </div>

                <div>
                  <strong>AI Feedback</strong>
                  <span>Strong technical explanation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          FEATURE INTRO
      ========================================== */}

      <section id="features" className="features">
        <div className="section-header">
          <span className="section-label">WHY HIREMIND</span>

          <h2>
            Everything you need to
            <span> prepare with confidence.</span>
          </h2>

          <p>
            HireMind combines AI-powered interviews, personalized feedback, and
            performance tracking into one focused preparation platform.
          </p>
        </div>

        <div className="feature-grid">
          <div className="feature-card featured">
            <div className="feature-icon purple">
              <Bot size={22} />
            </div>

            <span className="feature-number">01</span>

            <h3>AI Interviewer</h3>

            <p>
              Practice with realistic technical and HR questions generated
              around your selected role and difficulty.
            </p>

            <div className="feature-link">
              Personalized questions
              <ArrowRight size={15} />
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-icon blue">
              <BarChart3 size={22} />
            </div>

            <span className="feature-number">02</span>

            <h3>Performance Analysis</h3>

            <p>
              Understand your strengths and weaknesses with AI-powered scoring
              and detailed answer feedback.
            </p>

            <div className="feature-link">
              Detailed feedback
              <ArrowRight size={15} />
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-icon green">
              <Target size={22} />
            </div>

            <span className="feature-number">03</span>

            <h3>Role-Based Practice</h3>

            <p>
              Prepare specifically for frontend, backend, full-stack, MERN, and
              other technical interview paths.
            </p>

            <div className="feature-link">
              Practice your role
              <ArrowRight size={15} />
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-icon orange">
              <ShieldCheck size={22} />
            </div>

            <span className="feature-number">04</span>

            <h3>Secure & Personal</h3>

            <p>
              Your account and interview history are protected with secure
              authentication and user-specific data access.
            </p>

            <div className="feature-link">
              Built with security
              <ArrowRight size={15} />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          PRODUCT HIGHLIGHT
      ========================================== */}

      <section className="highlight-section">
        <div className="highlight-container">
          <div className="highlight-content">
            <span className="section-label">PRACTICE WITH PURPOSE</span>

            <h2>
              Every interview should
              <span> teach you something.</span>
            </h2>

            <p>
              Instead of simply telling you whether an answer was right or
              wrong, HireMind analyzes your response and helps you understand
              how to improve.
            </p>

            <div className="highlight-list">
              <div>
                <CheckCircle2 size={18} />
                <span>AI-powered answer evaluation</span>
              </div>

              <div>
                <CheckCircle2 size={18} />
                <span>Personalized improvement feedback</span>
              </div>

              <div>
                <CheckCircle2 size={18} />
                <span>Difficulty-based interview practice</span>
              </div>

              <div>
                <CheckCircle2 size={18} />
                <span>Track your interview performance</span>
              </div>
            </div>

            <Link to="/register" className="text-link">
              Start preparing
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="analytics-preview">
            <div className="analytics-header">
              <div>
                <span>Your performance</span>
                <strong>Interview Score</strong>
              </div>

              <span className="analytics-period">Last 5 interviews</span>
            </div>

            <div className="analytics-score">
              <strong>82</strong>
              <span>/100</span>
            </div>

            <div className="chart">
              <div className="chart-line">
                <span style={{ height: "35%" }}></span>
                <span style={{ height: "48%" }}></span>
                <span style={{ height: "43%" }}></span>
                <span style={{ height: "67%" }}></span>
                <span style={{ height: "82%" }}></span>
              </div>

              <div className="chart-labels">
                <span>01</span>
                <span>02</span>
                <span>03</span>
                <span>04</span>
                <span>05</span>
              </div>
            </div>

            <div className="analytics-footer">
              <div>
                <span>Average score</span>
                <strong>78%</strong>
              </div>

              <div>
                <span>Improvement</span>
                <strong className="improvement">+24%</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          HOW IT WORKS
      ========================================== */}

      <section id="how" className="how">
        <div className="section-header">
          <span className="section-label">SIMPLE PROCESS</span>

          <h2>
            From preparation to
            <span> confidence.</span>
          </h2>

          <p>
            Start practicing in minutes and turn every interview into a learning
            opportunity.
          </p>
        </div>

        <div className="steps">
          <div className="step">
            <div className="step-number">01</div>

            <div className="step-icon">
              <Target size={21} />
            </div>

            <h3>Select your role</h3>

            <p>
              Choose your target role and the difficulty that matches your
              preparation level.
            </p>
          </div>

          <div className="step">
            <div className="step-number">02</div>

            <div className="step-icon">
              <Brain size={21} />
            </div>

            <h3>Meet your AI interviewer</h3>

            <p>
              Get realistic, role-specific questions generated specifically for
              your session.
            </p>
          </div>

          <div className="step">
            <div className="step-number">03</div>

            <div className="step-icon">
              <Bot size={21} />
            </div>

            <h3>Answer the questions</h3>

            <p>
              Think through your response and answer as if you were sitting in a
              real interview.
            </p>
          </div>

          <div className="step">
            <div className="step-number">04</div>

            <div className="step-icon">
              <TrendingUp size={21} />
            </div>

            <h3>Review & improve</h3>

            <p>
              Receive your score, AI feedback, and insights to make your next
              interview stronger.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================
          CTA
      ========================================== */}

      <section className="cta">
        <div className="cta-glow"></div>

        <div className="cta-content">
          <div className="cta-icon">
            <Sparkles size={22} />
          </div>

          <span className="section-label">READY WHEN YOU ARE</span>

          <h2>
            Your next interview
            <span> starts here.</span>
          </h2>

          <p>
            Stop guessing what interviewers will ask. Start preparing with AI.
          </p>

          <Link to="/register" className="cta-button">
            Start practicing
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      {/* =========================================
          FOOTER
      ========================================== */}

      <footer>
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">H</div>

            <div>
              <h2>HireMind AI</h2>

              <p>AI-driven interview preparation for serious candidates.</p>
            </div>
          </div>

          <div className="footer-links">
            <a href="#features">Features</a>

            <a href="#how">How it works</a>

            <Link to="/login">Sign in</Link>

            <Link to="/register">Get started</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 HireMind AI</span>

          <span>Built for better interviews.</span>
        </div>
      </footer>
    </div>
  );
}

export default Home;
