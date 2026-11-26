import { Link } from "react-router-dom";
import "./Auth.css";

function Login() {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="auth-page">
      <Link to="/" className="auth-brand">
        Lost and Found
      </Link>

      <main className="auth-card">
        <h1>Log in</h1>
        <p className="auth-sub">
          Welcome back. Log in to report or claim an item.
        </p>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
          />

          <button type="submit" className="btn btn-primary auth-submit">
            Log in
          </button>
        </form>

        <p className="auth-switch">
          New here? <Link to="/register">Create an account</Link>
        </p>
      </main>
    </div>
  );
}

export default Login;