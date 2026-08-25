import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <div className="logo">🤖 HireMind AI</div>

      <div className="navLinks">
        <a href="#features">Features</a>

        <a href="#how">How It Works</a>

        <a href="#contact">Contact</a>

        <Link to="/login">
          <button className="loginBtn">Login</button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
