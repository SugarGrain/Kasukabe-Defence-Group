import { useState, useEffect } from "react";

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [location, setLocation] = useState("All");
  const [backendStatus, setBackendStatus] = useState("Checking...");
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetch("/api/health")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Backend unavailable");
      }
      return response.json();
    })
    .then((data) => {
      setBackendStatus(data.message);
    })
    .catch(() => {
      setBackendStatus("Backend connection failed");
    });
}, []);

async function findMatches() {
  const lostItem = {
    itemName: "Black Wallet",
    category: "Wallet",
    color: "Black",
    location: "IUB",
    dateLost: "2026-11-10"
  };

  

  
try {
  // Retrieve submitted found items from the backend
  const foundResponse = await fetch("/api/found-items");

  if (!foundResponse.ok) {
    throw new Error("Failed to retrieve found items");
  }

  const foundData = await foundResponse.json();
  const foundItems = foundData.items;

  // Send retrieved items to the matching API
  const response = await fetch("/api/matches", {
    method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ lostItem, foundItems })
    });

    if (!response.ok) {
      throw new Error("Matching request failed");
    }

    const data = await response.json();
    setMatches(data.matches);
  } catch (error) {
    console.error("Matching error:", error);
    setMatches([]);
  }
}




  const [items, setItems] = useState([]);
  
  useEffect(() => {
  const controller = new AbortController();

  const params = new URLSearchParams({
    keyword: search,
    category: category === "All" ? "" : category,
    location: location === "All" ? "" : location,
  });

  fetch(`/api/search?${params.toString()}`, {
    signal: controller.signal,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Search request failed");
      }
      return response.json();
    })
    .then((data) => {
      const results = data.items.map((item) => ({
        ...item,
        name: item.itemName,
      }));

      setItems(results);
    })
    .catch((error) => {
      if (error.name !== "AbortError") {
        console.error("Search error:", error);
        setItems([]);
      }
    });

  return () => controller.abort();
}, [search, category, location]);

  

const filteredItems = items.filter((item) => {
  const matchesSearch = item.name
    .toLowerCase()
    .includes(search.toLowerCase());

  const matchesCategory =
    category === "All" || item.category === category;

  const matchesLocation =
    location === "All" || item.location === location;

  return matchesSearch && matchesCategory && matchesLocation;
});


  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Lost and Found System</h1>
      <p style={{ color: "green", marginBottom: "20px" }}>
        Backend Status: {backendStatus}
      </p>

      <h2>Search Items</h2>

      <input
        type="text"
        placeholder="Search for an item..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "12px",
          width: "300px",
          marginBottom: "20px",
        }}
      />

<select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  style={{
    padding: "12px",
    marginLeft: "10px",
    borderRadius: "5px",
  }}
>
  <option value="All">All Categories</option>
  <option value="Wallet">Wallet</option>
  <option value="Electronics">Electronics</option>
  <option value="Documents">Documents</option>
</select>


<select
  value={location}
  onChange={(e) => setLocation(e.target.value)}
  style={{
    padding: "12px",
    marginLeft: "10px",
    borderRadius: "5px",
  }}
>
  <option value="All">All Locations</option>
  <option value="IUB">IUB</option>
  <option value="Dhaka">Dhaka</option>
</select>


<button
  onClick={findMatches}
  style={{
    padding: "12px 20px",
    marginLeft: "10px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  }}
>
  Find Matches
</button>



      <div>
        {filteredItems.length === 0 ? (
           <p style={{ color: "gray", marginTop: "20px" }}>
             No items found matching your search.
           </p>
        ) : (
          filteredItems.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid gray",
              padding: "15px",
              marginBottom: "10px",
              borderRadius: "8px",
            }}
          >
            <h3>{item.name}</h3>
            <p>Category: {item.category}</p>
            <p>Location: {item.location}</p>
          </div>
          ))
        )}
      </div>
      <div style={{ marginTop: "30px" }}>
  <h2>Possible Matches</h2>

  {matches.length === 0 ? (
    <p>No matching results yet. Click "Find Matches".</p>
  ) : (
    matches.map((item, index) => (
      <div
        key={index}
        style={{
          border: "1px solid #ddd",
          padding: "15px",
          marginBottom: "10px",
          borderRadius: "8px",
        }}
      >
        <h3>{item.itemName}</h3>
        <p>Category: {item.category}</p>
        <p>Location: {item.location}</p>
        <p>Match Score: {item.matchScore}/100</p>
      </div>
    ))
  )}
</div>
    </div>
  );
}

export default App;
