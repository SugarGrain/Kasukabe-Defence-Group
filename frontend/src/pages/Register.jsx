import { Link } from "react-router-dom";
import "./Auth.css";

function Register() {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="auth-page">
      <Link to="/" className="auth-brand">
        Lost and Found
      </Link>

      <main className="auth-card">
        <h1>Create an account</h1>
        <p className="auth-sub">
          Make an account to report, search and claim items.
        </p>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" autoComplete="name" />

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
            autoComplete="new-password"
          />
          <p className="field-hint">
            At least 8 characters, with an uppercase letter, a lowercase
            letter, a number and a symbol.
          </p>

          <label htmlFor="confirmPassword">Confirm password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
          />

          <button type="submit" className="btn btn-primary auth-submit">
            Create account
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </main>
    </div>
  );
}

export default Register;