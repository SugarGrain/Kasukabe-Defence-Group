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

        <aside className="hero-card" aria-label="Sample listing">
          <div className="tag-hole" aria-hidden="true"></div>
          <p className="tag-status">Found</p>
          <h3 className="tag-title">Black leather wallet</h3>
          <dl className="tag-details">
            <div>
              <dt>Where</dt>
              <dd>Library, second floor</dd>
            </div>
            <div>
              <dt>When</dt>
              <dd>Tuesday, around 3 pm</dd>
            </div>
            <div>
              <dt>Contact</dt>
              <dd>Through the claim form</dd>
            </div>
          </dl>
          <p className="tag-note">Sample listing</p>
        </aside>
      </div>
    </section>
  );
}

export default Hero;