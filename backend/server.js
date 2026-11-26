
const express = require("express");

const { searchItems, suggestMatches } = require("./utils/searchMatching");

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


app.get("/api/search", (req, res) => {
  const { keyword = "", category = "", location = "" } = req.query;

  // Temporary sample data for testing
  const items = [
    {
      id: 1,
      itemName: "Black Wallet",
      description: "Lost leather wallet",
      category: "Wallet",
      location: "IUB"
    },
    {
      id: 2,
      itemName: "Samsung Phone",
      description: "Samsung smartphone",
      category: "Electronics",
      location: "Dhaka"
    },
    {
      id: 3,
      itemName: "Student ID Card",
      description: "University student ID card",
      category: "Documents",
      location: "IUB"
    }
  ];

  const results = searchItems(items, {
    keyword: String(keyword),
    category: category === "All" ? "" : String(category),
    location: location === "All" ? "" : String(location)
  });

  res.json({
    success: true,
    totalResults: results.length,
    items: results
  });
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
