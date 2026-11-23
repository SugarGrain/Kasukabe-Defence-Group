import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      <nav className="navbar-inner container">
        <Link to="/" className="navbar-brand">
          Lost and Found
        </Link>

        <div className="navbar-links">
          <a href="#how-it-works">How it works</a>
          <a href="#features">Features</a>
        </div>

        <div className="navbar-actions">
          <Link to="/login" className="btn btn-outline">
            Login
          </Link>
          <Link to="/register" className="btn btn-primary">
            Register
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;