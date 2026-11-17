
const express = require("express");

const { suggestMatches } = require("./utils/searchMatching");

const app = express();
const PORT = 5000;

// Allow the server to receive JSON data
app.use(express.json());

// Test API endpoint
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Lost and Found backend is running!"
  });
});

app.post("/api/matches", (req, res) => {
  const { lostItem, foundItems } = req.body;

  // Validate input
  if (
    !lostItem ||
    !Array.isArray(foundItems)
  ) {
    return res.status(400).json({
      success: false,
      message: "Valid lostItem and foundItems are required"
    });
  }

  // Find possible matches
  const matches = suggestMatches(lostItem, foundItems);

  res.json({
    success: true,
    totalMatches: matches.length,
    matches: matches
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
