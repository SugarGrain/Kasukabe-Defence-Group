
const express = require("express");

const mongoose = require("mongoose");
const FoundItem = require("./models/FoundItem");
const LostItem = require("./models/LostItem");
const path = require("path");

require("dotenv").config({
  path: path.join(__dirname, ".env")
});


const { searchItems, suggestMatches } = require("./utils/searchMatching");

const app = express();
const PORT = 5000;
const foundItemReports = [];


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



app.get("/api/search", async (req, res) => {
  const { keyword = "", category = "", location = "" } = req.query;

  try {
    // Retrieve real found item reports from MongoDB
    const foundItems = await FoundItem.find().lean();

    // Keep the ID format compatible with the frontend
    const allItems = foundItems.map((item) => ({
      ...item,
      id: String(item._id)
    }));

    // Apply existing search filters
    const results = searchItems(allItems, {
      keyword: String(keyword),
      category: category === "All" ? "" : String(category),
      location: location === "All" ? "" : String(location)
    });

    res.json({
      success: true,
      totalResults: results.length,
      items: results
    });
  } catch (error) {
    console.error("Search failed:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to search found items."
    });
  }
});




app.post("/api/found-items", async (req, res) => {
  const {
    itemName,
    category,
    location,
    foundDate,
    description,
    color = ""
  } = req.body || {};

  // Validate required fields
  if (
    [itemName, category, location, foundDate, description].some(
      (value) => typeof value !== "string" || !value.trim()
    )
  ) {
    return res.status(400).json({
      success: false,
      message: "All required fields must be provided."
    });
  }

  // Validate optional color field
if (typeof color !== "string") {
  return res.status(400).json({
    success: false,
    message: "Color must be text."
  });
}
  // Validate the date
  const parsedDate = new Date(foundDate.trim());

  if (Number.isNaN(parsedDate.getTime())) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid found date."
    });
  }

  try {
    // Save the report permanently in MongoDB
    const newReport = await FoundItem.create({
      itemName: itemName.trim(),
      category: category.trim(),
      location: location.trim(),
      dateFound: parsedDate,
      description: description.trim(),
      color: color.trim(),
      status: "Available"
    });

    res.status(201).json({
      success: true,
      message: "Found item report submitted successfully!",
      item: newReport
    });
  } catch (error) {
    console.error("Failed to save found item:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to save found item report."
    });
  }
});



app.get("/api/found-items", async (req, res) => {
  try {
    const items = await FoundItem.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      totalItems: items.length,
      items: items
    });
  } catch (error) {
    console.error("Failed to retrieve found items:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve found items."
    });
  }
});

// Submit a Lost Item report
app.post("/api/lost-items", async (req, res) => {
  const {
    itemName,
    category,
    location,
    dateLost,
    color = "",
    description = ""
  } = req.body || {};

  // Validate required fields
  if (
    [itemName, category, location, dateLost].some(
      (value) => typeof value !== "string" || !value.trim()
    )
  ) {
    return res.status(400).json({
      success: false,
      message: "All required fields must be provided."
    });
  }

  if (typeof color !== "string" || typeof description !== "string") {
    return res.status(400).json({
      success: false,
      message: "Color and description must be text."
    });
  }

  // Validate the lost date
  const parsedDate = new Date(dateLost.trim());

  if (Number.isNaN(parsedDate.getTime())) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid lost date."
    });
  }

  try {
    // Save lost item to MongoDB
    const newReport = await LostItem.create({
      itemName: itemName.trim(),
      category: category.trim(),
      location: location.trim(),
      dateLost: parsedDate,
      color: color.trim(),
      description: description.trim(),
      status: "Lost"
    });

    res.status(201).json({
      success: true,
      message: "Lost item report submitted successfully!",
      item: newReport
    });
  } catch (error) {
    console.error("Failed to save lost item:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to save lost item report."
    });
  }
});

// Retrieve all Lost Item reports
app.get("/api/lost-items", async (req, res) => {
  try {
    const items = await LostItem.find()
      .sort({ createdAt: -1 })
      .lean();

    res.json({
      success: true,
      totalItems: items.length,
      items: items
    });
  } catch (error) {
    console.error("Failed to retrieve lost items:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve lost items."
    });
  }
});

// Connect MongoDB before starting the server
const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  console.error("MONGODB_URI is missing in backend/.env");
  process.exit(1);
}

mongoose
  .connect(mongoUri, {
    dbName: "lost_and_found",
    serverSelectionTimeoutMS: 10000
  })
  .then(() => {
    console.log("Connected to MongoDB Atlas!");

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  });


