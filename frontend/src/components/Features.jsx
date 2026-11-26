import { Link } from "react-router-dom";
import "./Features.css";

const features = [
  {
    title: "User Authentication",
    text: "Create an account and log in, so every report and claim belongs to a real person.",
  },
  {
    title: "Lost Item Management",
    text: "Report a lost item, edit the details, and close the report once it is returned.",
  },
  {
    title: "Found Item Management",
    text: "Post a found item with a photo, the place and the date.",
  },
  {
    title: "Search and Matching",
    text: "Search all reports and see lost and found items that look like a match.",
  },
  {
    title: "Claim and Recovery",
    text: "Claim an item, get it approved by an admin, and mark it as recovered.",
    to: "/claims",
  },
];

function Features() {
  return (
    <section className="features" id="features">
      <div className="container">
        <h2>Features</h2>
        <div className="feature-grid">
          {features.map((feature) => {
            const card = (
              <article className="feature-card" key={feature.title}>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </article>
            );

            return feature.to ? (
              <Link to={feature.to} className="feature-card-link" key={feature.title}>
                {card}
              </Link>
            ) : (
              card
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Features;