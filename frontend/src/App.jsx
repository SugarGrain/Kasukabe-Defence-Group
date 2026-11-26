import { Routes, Route } from "react-router-dom";
import "./App.css";
import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ClaimPage from "./pages/ClaimPage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/claims" element={<ClaimPage />} />
    </Routes>
  );
}

export default App;