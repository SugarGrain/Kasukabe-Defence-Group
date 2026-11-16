
import { useState } from "react";

function FoundItem() {
  const [formData, setFormData] = useState({
    itemName: "",
    category: "",
    location: "",
    foundDate: "",
    description: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Found item form submitted successfully!");
    console.log(formData);
  };

  return (
    <div>
      <h1>Report a Found Item</h1>
      <p>Please provide information about the item you found.</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="itemName">Item Name</label>
          <input
            id="itemName"
            type="text"
            name="itemName"
            value={formData.itemName}
            onChange={handleChange}
            placeholder="Enter item name"
            required
          />
        </div>

        <div>
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="Electronics">Electronics</option>
            <option value="Documents">Documents</option>
            <option value="Accessories">Accessories</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div>
          <label htmlFor="location">Found Location</label>
          <input
            id="location"
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Where did you find the item?"
            required
          />
        </div>

        <div>
          <label htmlFor="foundDate">Found Date</label>
          <input
            id="foundDate"
            type="date"
            name="foundDate"
            max={new Date().toLocaleDateString("en-CA")}
            value={formData.foundDate}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the item"
            rows="4"
            required
          />
        </div>

        <button type="submit">Submit Found Item</button>
      </form>
    </div>
  );
}

export default FoundItem;
