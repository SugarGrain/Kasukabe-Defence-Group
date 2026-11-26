import "./HowItWorks.css";

const steps = [
  {
    title: "Report",
    text: "Lost something? Describe it and say where you last saw it. Found something? Post it with where and when you found it.",
  },
  {
    title: "Match",
    text: "The system compares lost and found reports and shows the ones that look like a match.",
  },
  {
    title: "Claim",
    text: "The owner sends a claim, an admin checks it, and the item is handed back.",
  },
];

function HowItWorks() {
  return (
    <section className="how" id="how-it-works">
      <div className="container">
        <h2>How it works</h2>
        <ol className="how-steps">
          {steps.map((step, index) => (
            <li className="how-step" key={step.title}>
              <p className="how-number">{index + 1}</p>
              <h3>{step.title}</h3>
              <p className="how-text">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default HowItWorks;