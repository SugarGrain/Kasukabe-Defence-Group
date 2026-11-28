import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import "./Navbar.css";

function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, isLoggedIn, logout } = useAuth();
  const close = () => setOpen(false);

  const handleLogout = () => {
    logout();
    close();
  };

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
            {isLoggedIn ? (
              <>
                <span className="navbar-user">{user.name}</span>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline" onClick={close}>
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary" onClick={close}>
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;