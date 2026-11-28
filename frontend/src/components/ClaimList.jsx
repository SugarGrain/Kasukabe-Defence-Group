import { useState } from "react";

export default function ClaimList({ claims, onStatusChange, onRecover, isAdmin }) {
  const [notes, setNotes] = useState({});
  const [messages, setMessages] = useState({});

  return (
    <div className="card">
      <h2>All Claims</h2>
      {claims.length === 0 && <p>No claims yet.</p>}
      {claims.map((c) => (
        <div key={c._id} className="claim-item">
          <p><b>{c.claimantName}</b> ({c.claimantEmail})</p>
          <p>Item: {c.itemName}</p>
          <p>Proof: {c.proofDescription}</p>
          <p>
            Status: <span className={`badge badge-${c.status}`}>{c.status}</span>
          </p>
          {c.adminMessage && <p>Admin message: {c.adminMessage}</p>}

          {isAdmin && c.status === "pending" && (
            <div className="recover-box">
              <textarea
                placeholder="Message to claimant (e.g. visit the office with your ID card and unlock the phone) or the reason for rejecting"
                value={messages[c._id] || ""}
                onChange={(e) => setMessages({ ...messages, [c._id]: e.target.value })}
              />
              <div className="claim-actions">
                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={!messages[c._id]}
                  onClick={() => onStatusChange(c._id, "approved", messages[c._id])}
                >
                  Approve
                </button>
                <button
                  type="button"
                  className="btn btn-outline claim-reject"
                  disabled={!messages[c._id]}
                  onClick={() => onStatusChange(c._id, "rejected", messages[c._id])}
                >
                  Reject
                </button>
              </div>
            </div>
          )}

          {isAdmin && c.status === "approved" && (
            <div className="recover-box">
              <input
                placeholder="Handover note (who received it, when, where)"
                value={notes[c._id] || ""}
                onChange={(e) => setNotes({ ...notes, [c._id]: e.target.value })}
              />
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => onRecover(c._id, notes[c._id] || "")}
                disabled={!notes[c._id]}
              >
                Mark as recovered
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