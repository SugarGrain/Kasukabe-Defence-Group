import { useState } from "react";

export default function ClaimForm({ onSubmit }) {
  const [form, setForm] = useState({
    itemName: "",
    claimantName: "",
    claimantEmail: "",
    proofDescription: "",
  });
  const [msg, setMsg] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...form, _id: Date.now().toString(), status: "pending" });
    setMsg("Claim submitted. Please wait for the admin's message.");
    setForm({ itemName: "", claimantName: "", claimantEmail: "", proofDescription: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="card claim-form">
      <h2>Claim an Item</h2>
      <input
        name="itemName"
        placeholder="Item name (e.g. iPhone 18 Pro Max)"
        value={form.itemName}
        onChange={handleChange}
        required
      />
      <input name="claimantName" placeholder="Your Name" value={form.claimantName} onChange={handleChange} required />
      <input name="claimantEmail" type="email" placeholder="Your Email" value={form.claimantEmail} onChange={handleChange} required />
      <textarea
        name="proofDescription"
        placeholder="Describe proof of ownership: colour, where and when you lost it, any special mark. Do not write passwords here."
        value={form.proofDescription}
        onChange={handleChange}
        required
      />
      <button type="submit" className="btn btn-primary">Submit Claim</button>
      {msg && <p className="success-msg">{msg}</p>}
    </form>
  );
}