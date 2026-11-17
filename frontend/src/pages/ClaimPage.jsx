import { useState } from "react";
import ClaimForm from "../components/ClaimForm";
import ClaimList from "../components/ClaimList";
import "./ClaimPage.css";

export default function ClaimPage() {
  const [claims, setClaims] = useState([]);

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
        <ClaimForm onSubmit={addClaim} />
        <ClaimList
          claims={claims}
          onStatusChange={changeStatus}
          onRecover={recoverItem}
        />
      </div>
    </div>
  );
}