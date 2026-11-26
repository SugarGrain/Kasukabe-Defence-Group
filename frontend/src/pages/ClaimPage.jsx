import { useState } from "react";
import ClaimForm from "../components/ClaimForm";
import ClaimList from "../components/ClaimList";
import "./ClaimPage.css";

export default function ClaimPage() {
  const [claims, setClaims] = useState([]);
  const [role, setRole] = useState("user");

  const addClaim = (claim) => setClaims([claim, ...claims]);

  const changeStatus = (id, status) =>
    setClaims(claims.map((c) => (c._id === id ? { ...c, status } : c)));

  const recoverItem = (id, handoverNote) =>
    setClaims(
      claims.map((c) =>
        c._id === id
          ? {
              ...c,
              status: "recovered",
              handoverNote,
              recoveredAt: new Date().toLocaleDateString(),
            }
          : c
      )
    );

  return (
    <div className="claim-page">
      <div className="claim-container">
        <h1 className="claim-title">Claim & Item Recovery</h1>
        <p className="claim-subtitle">Submit a claim and track recovery of your lost item</p>

        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <button
            className={`btn ${role === "user" ? "btn-primary" : ""}`}
            style={role !== "user" ? { background: "#9ca3af" } : {}}
            onClick={() => setRole("user")}
          >
            User View
          </button>{" "}
          <button
            className={`btn ${role === "admin" ? "btn-primary" : ""}`}
            style={role !== "admin" ? { background: "#9ca3af" } : {}}
            onClick={() => setRole("admin")}
          >
            Admin View
          </button>
        </div>

        {role === "user" && <ClaimForm onSubmit={addClaim} />}

        <ClaimList
          claims={claims}
          onStatusChange={changeStatus}
          onRecover={recoverItem}
          isAdmin={role === "admin"}
        />
      </div>
    </div>
  );
}