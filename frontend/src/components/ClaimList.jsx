import { useState } from "react";

export default function ClaimList({ claims, onStatusChange, onRecover }) {
  const [notes, setNotes] = useState({});

  return (
    <div>
      <h2>All Claims</h2>
      {claims.length === 0 && <p>No claims yet.</p>}
      {claims.map((c) => (
        <div key={c._id} style={{ border: "1px solid gray", margin: 8, padding: 8 }}>
          <p><b>{c.claimantName}</b> ({c.claimantEmail})</p>
          <p>Item: {c.itemId}</p>
          <p>Proof: {c.proofDescription}</p>
          <p>Status: <b>{c.status}</b></p>

          {c.status === "pending" && (
            <>
              <button onClick={() => onStatusChange(c._id, "approved")}>Approve</button>
              <button onClick={() => onStatusChange(c._id, "rejected")}>Reject</button>
            </>
          )}

          {c.status === "approved" && (
            <div>
              <input
                placeholder="Handover note (where/how returned)"
                value={notes[c._id] || ""}
                onChange={(e) => setNotes({ ...notes, [c._id]: e.target.value })}
              />
              <button
                onClick={() => onRecover(c._id, notes[c._id] || "")}
                disabled={!notes[c._id]}
              >
                Mark as Recovered
              </button>
            </div>
          )}

          {c.status === "recovered" && (
            <>
              <p>Handover: {c.handoverNote}</p>
              <p>Recovered on: {c.recoveredAt}</p>
            </>
          )}
        </div>
      ))}
    </div>
  );
}