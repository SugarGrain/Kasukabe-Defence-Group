import { useState } from "react";
import ClaimForm from "../components/ClaimForm";
import ClaimList from "../components/ClaimList";

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
    <div style={{ padding: 16 }}>
      <ClaimForm onSubmit={addClaim} />
      <hr />
      <ClaimList
        claims={claims}
        onStatusChange={changeStatus}
        onRecover={recoverItem}
      />
    </div>
  );
}