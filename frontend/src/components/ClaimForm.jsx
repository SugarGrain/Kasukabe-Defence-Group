import { useState } from "react";

export default function ClaimForm({ onSubmit }) {
  const [form, setForm] = useState({
    itemId: "",
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
    setMsg("Claim submitted successfully!");
    setForm({ itemId: "", claimantName: "", claimantEmail: "", proofDescription: "" });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 8, maxWidth: 400 }}>
      <h2>Claim an Item</h2>
      <input name="itemId" placeholder="Item ID" value={form.itemId} onChange={handleChange} required />
      <input name="claimantName" placeholder="Your Name" value={form.claimantName} onChange={handleChange} required />
      <input name="claimantEmail" type="email" placeholder="Your Email" value={form.claimantEmail} onChange={handleChange} required />
      <textarea name="proofDescription" placeholder="Describe proof of ownership" value={form.proofDescription} onChange={handleChange} required />
      <button type="submit">Submit Claim</button>
      <p>{msg}</p>
    </form>
  );
}