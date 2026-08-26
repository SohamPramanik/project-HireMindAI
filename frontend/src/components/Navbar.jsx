import "./Navbar.css";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <div className="logo-icon">
            <Sparkles size={19} />
          </div>

          <span>
            HireMind<span className="logo-ai"> AI</span>
          </span>
        </Link>

        {/* Navigation */}
        <div className="nav-links">
          <a href="#features">Features</a>

          <a href="#how">How It Works</a>

          <a href="#stats">Why HireMind</a>

          <a href="#contact">Contact</a>
        </div>

        {/* Actions */}
        <div className="nav-actions">
          <Link to="/login" className="nav-login">
            Login
          </Link>

          <Link to="/register" className="nav-get-started">
            Get Started
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
