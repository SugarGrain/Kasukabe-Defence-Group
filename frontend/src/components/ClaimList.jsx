import { useState } from "react";

export default function ClaimList({ claims, onStatusChange, onRecover }) {
  const [notes, setNotes] = useState({});

  return (
    <div className="card">
      <h2>All Claims</h2>
      {claims.length === 0 && <p>No claims yet.</p>}
      {claims.map((c) => (
        <div key={c._id} className="claim-item">
          <p><b>{c.claimantName}</b> ({c.claimantEmail})</p>
          <p>Item ID: {c.itemId}</p>
          <p>Proof: {c.proofDescription}</p>
          <p>
            Status: <span className={`badge badge-${c.status}`}>{c.status}</span>
          </p>

          {c.status === "pending" && (
            <div className="claim-actions">
              <button className="btn btn-approve" onClick={() => onStatusChange(c._id, "approved")}>Approve</button>
              <button className="btn btn-reject" onClick={() => onStatusChange(c._id, "rejected")}>Reject</button>
            </div>
          )}

          {c.status === "approved" && (
            <div className="recover-box">
              <input
                placeholder="Handover note (where/how returned)"
                value={notes[c._id] || ""}
                onChange={(e) => setNotes({ ...notes, [c._id]: e.target.value })}
              />
              <button
                className="btn btn-recover"
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