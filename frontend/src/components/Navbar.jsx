import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="navbar">
      <nav className="navbar-inner container">
        <Link to="/" className="navbar-brand" onClick={close}>
          Lost and Found
        </Link>

        <button
          type="button"
          className="navbar-toggle"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? "Close" : "Menu"}
        </button>

        <div className={"navbar-menu" + (open ? " is-open" : "")}>
          <div className="navbar-links">
            <a href="#how-it-works" onClick={close}>
              How it works
            </a>
            <a href="#features" onClick={close}>
              Features
            </a>
          </div>

          <div className="navbar-actions">
            <Link to="/login" className="btn btn-outline" onClick={close}>
              Login
            </Link>
            <Link to="/register" className="btn btn-primary" onClick={close}>
              Register
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;