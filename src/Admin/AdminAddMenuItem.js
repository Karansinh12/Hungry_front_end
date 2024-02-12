import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminAddMenuItem = () => {
  const [menuItemData, setMenuItemData] = useState({
    restaurantId: "",  
    name: "",
    price: "",
    description: "",
    image: "",
    category: "",
  });

  const [restaurantNames, setRestaurantNames] = useState([]);

  useEffect(() => {
    // Fetch restaurant names
    axios.get("http://localhost:5000/api/restaurants/names")
      .then(response => {
        setRestaurantNames(response.data);
      })
      .catch(error => console.error("Error fetching restaurant names:", error));
  }, []);

  const handleMenuItemChange = (e) => {
    setMenuItemData({ ...menuItemData, [e.target.name]: e.target.value });
  };

  const handleAddMenuItem = async () => {
    try {
      // Send restaurantId in the request body
      await axios.post("http://localhost:5000/api/admin/add-menu-item", menuItemData);
      alert("Menu item added successfully!");
    } catch (error) {
      console.error("Error adding menu item:", error);
      alert("Error adding menu item. Please try again.");
    }
  };

  return (
    <div className="card mt-4 mb-4" style={{ width: "400px", boxShadow: '0 4px 8px rgba(0,0,0,0.1)', backgroundColor: '#f8f9fa', margin: 'auto' }}>
      <div className="card-body text-dark">
        <h2 className="card-title text-center">Add Menu Item</h2>
        <form>
          <div className="mb-3">
            <label className="form-label">Restaurant:</label>
            <select
              className="form-select"
              name="restaurantId"
              value={menuItemData.restaurantId}
              onChange={handleMenuItemChange}
            >
              <option value="" disabled>Select a restaurant</option>
              {restaurantNames.map((restaurant, index) => (
                <option key={index} value={restaurant}>{restaurant}</option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Name:</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={menuItemData.name}
              onChange={handleMenuItemChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Price:</label>
            <input
              type="text"
              className="form-control"
              name="price"
              value={menuItemData.price}
              onChange={handleMenuItemChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description:</label>
            <textarea
              className="form-control"
              name="description"
              value={menuItemData.description}
              onChange={handleMenuItemChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Image:</label>
            <input
              type="text"
              className="form-control"
              name="image"
              value={menuItemData.image}
              onChange={handleMenuItemChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Category:</label>
            <input
              type="text"
              className="form-control"
              name="category"
              value={menuItemData.category}
              onChange={handleMenuItemChange}
            />
          </div>

          <button type="button" className="btn bg-dark text-warning fw-bold" onClick={handleAddMenuItem}>
            Add Menu Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminAddMenuItem;
