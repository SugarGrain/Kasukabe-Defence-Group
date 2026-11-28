const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

function missingPasswordParts(password) {
  const missing = [];
  if (password.length < 8) missing.push("8 characters");
  if (!/[a-z]/.test(password)) missing.push("a lowercase letter");
  if (!/[A-Z]/.test(password)) missing.push("an uppercase letter");
  if (!/[0-9]/.test(password)) missing.push("a number");
  if (!/[^A-Za-z0-9]/.test(password)) missing.push("a symbol");
  return missing;
}

router.post("/register", async (req, res) => {
  const { name = "", email = "", password = "" } = req.body || {};

  if (name.trim().length < 2) {
    return res
      .status(400)
      .json({ success: false, message: "Name must be at least 2 characters." });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return res
      .status(400)
      .json({ success: false, message: "Enter a valid email address." });
  }

  const missing = missingPasswordParts(password);
  if (missing.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Password still needs: " + missing.join(", ")
    });
  }

  try {
    const cleanEmail = email.trim().toLowerCase();
    const existing = await User.findOne({ email: cleanEmail });

    if (existing) {
      return res
        .status(409)
        .json({ success: false, message: "This email is already registered." });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      name: name.trim(),
      email: cleanEmail,
      password: hashed
    });

    res.status(201).json({
      success: true,
      message: "Account created.",
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    console.error("Register failed:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Could not create the account." });
  }
});

module.exports = router;