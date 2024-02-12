import React, { useState } from "react";
import axios from "axios";

const AdminAddRestaurant = () => {
  const [restaurantData, setRestaurantData] = useState({
    name: "",
    cuisine: "",
    image: "",
    address: "",
    location:"",
    ratings: 0,
  });

  const handleRestaurantChange = (e) => {
    setRestaurantData({ ...restaurantData, [e.target.name]: e.target.value });
  };

  const handleAddRestaurant = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/admin/add-restaurant", restaurantData);
      alert(`Restaurant added successfully! Restaurant Name: ${response.data.restaurant.name}`);
    } catch (error) {
      console.error("Error adding restaurant:", error);
      alert("Error adding restaurant. Please try again.");
    }
  };

  return (
    <div className="card mt-4 mb-4" style={{ width: "400px", boxShadow: '0 4px 8px rgba(0,0,0,0.1)', backgroundColor: '#f8f9fa', margin: 'auto' }}>
      <div className="card-body text-dark">
        <h2 className="card-title text-center">Add Restaurant</h2>
        <form>

          <div className="mb-3">
            <label className="form-label">Name:</label>
            <input type="text" className="form-control" name="name" value={restaurantData.name} onChange={handleRestaurantChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">Cuisine:</label>
            <input type="text" className="form-control" name="cuisine" value={restaurantData.cuisine} onChange={handleRestaurantChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">Image:</label>
            <input type="text" className="form-control" name="image" value={restaurantData.image} onChange={handleRestaurantChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">Address:</label>
            <input type="text" className="form-control" name="address" value={restaurantData.address} onChange={handleRestaurantChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">City:</label>
            <input type="text" className="form-control" name="location" value={restaurantData.location} onChange={handleRestaurantChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">Ratings:</label>
            <input type="number" className="form-control" name="ratings" value={restaurantData.ratings} onChange={handleRestaurantChange} />
          </div>

          <button type="button" className="btn bg-dark text-warning fw-bold" onClick={handleAddRestaurant}>
            Add Restaurant
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminAddRestaurant;
