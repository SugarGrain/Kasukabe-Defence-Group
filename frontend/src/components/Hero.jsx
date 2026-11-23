import { Link } from "react-router-dom";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="container hero-inner">
        <div className="hero-text">
          <h1>Report what you lost. Return what you found.</h1>
          <p>
            Lost and Found is a simple place to report a missing item, post
            something you found, and get it back to the right person.
          </p>
          <div className="hero-actions">
            <Link to="/register" className="btn btn-primary">
              Create an account
            </Link>
            <Link to="/login" className="btn btn-outline">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;