import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
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
    <>
      <Navbar />
      <main className="claim-page">
        <div className="container">
          <h1>Claim and Recovery</h1>
          <p className="claim-subtitle">
            Submit a claim and track the recovery of your lost item.
          </p>

          <div className="claim-toggle">
            <button
              type="button"
              className={`btn ${role === "user" ? "btn-primary" : "btn-outline"}`}
              onClick={() => setRole("user")}
            >
              User view
            </button>
            <button
              type="button"
              className={`btn ${role === "admin" ? "btn-primary" : "btn-outline"}`}
              onClick={() => setRole("admin")}
            >
              Admin view
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
      </main>
      <Footer />
    </>
  );
}