import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./css/RestaurantList.css";

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/restaurants")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setRestaurants(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const matchesSearch = restaurant.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesLocation = selectedLocation
      ? restaurant.location === selectedLocation
      : true;
    const matchesCuisine = selectedCuisine
      ? restaurant.cuisine === selectedCuisine
      : true;
    return matchesSearch && matchesLocation && matchesCuisine;
  });

  // Extract unique cuisines for dropdown options
  const locations = [
    ...new Set(restaurants.map((restaurant) => restaurant.location)),
  ];

  const cuisines = [
    ...new Set(restaurants.map((restaurant) => restaurant.cuisine)),
  ];

  return (
    <div class="mt-4">
      <h2>Restaurant List</h2>
      <div className="containersearch">
        <div className="search-section">
          <input
            type="text"
            placeholder="Search by restaurant name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="dropdown"
          >
            <option value="">All Locations</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
          <select
            value={selectedCuisine}
            onChange={(e) => setSelectedCuisine(e.target.value)}
            className="dropdown"
          >
            <option value="">All Cuisines</option>
            {cuisines.map((cuisine) => (
              <option key={cuisine} value={cuisine}>
                {cuisine}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : restaurants.length > 0 ? (
        <div className="container1">
          {filteredRestaurants.map((restaurant) => (
            <Link
              to={`/restaurant/${restaurant.restaurantId}`}
              key={restaurant.restaurantId}
            >
              <div id={restaurant.id} className="restaurant">
                <img src={restaurant.image} alt="restaurant-img" />
                <div>
                  <h2>{restaurant.name}</h2>
                  <p>Address: {restaurant.address}</p>
                  <p>Cuisine: {restaurant.cuisine}</p>
                  <p>Rating: {restaurant.ratings}/5</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p>No restaurants to display.</p>
      )}
    </div>
  );
};

const styles = {
  searchsection: {
    display: "flex",
    justifyContent: "center",
  },
  searchContainer: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #ccc",
    borderRadius: "200px",
    padding: "5px",
    marginTop: "10px",
    width: "500px",
  },
  searchInput: {
    flex: "1",
    border: "none",
    outline: "none",
    padding: "5px",
    borderRadius: "20px",
  },
  searchButton: {
    backgroundColor: "#000",
    color: "white",
    border: "none",
    borderRadius: "20px",
    padding: "5px 10px",
    cursor: "pointer",
    marginLeft: "2px",
    width: "100px",
  },
  searchButtonHover: {
    backgroundColor: "#45a045",
  },
};

export default RestaurantList;
