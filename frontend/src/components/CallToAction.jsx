import { Link } from "react-router-dom";
import "./CallToAction.css";

function CallToAction() {
  return (
    <section className="cta">
      <div className="container">
        <div className="cta-box">
          <h2>Lost something, or found something?</h2>
          <p>Create an account and report it. Someone may already be looking.</p>
          <Link to="/register" className="btn btn-primary">
            Create an account
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CallToAction;