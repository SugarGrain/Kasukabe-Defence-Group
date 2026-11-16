
import { useState } from "react";

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [location, setLocation] = useState("All");


  const items = [
    { id: 1, name: "Black Wallet", category: "Wallet", location: "IUB" },
    { id: 2, name: "Samsung Phone", category: "Electronics", location: "Dhaka" },
    { id: 3, name: "Student ID Card", category: "Documents", location: "IUB" },
  ];

  

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
    </div>
  );
}

export default App;
