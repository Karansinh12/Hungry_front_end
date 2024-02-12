import React, { useState, useEffect } from "react";
import "./ManageRestaurant.css";
import { Link } from "react-router-dom";

export default function ManageRestaurant() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleDelete = async (restaurantId) => {
    console.log(restaurantId);
    try {
      const response = await fetch(
        `http://localhost:5000/restaurantdelete/${restaurantId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setLoading(!loading);
        console.log("Restaurant deleted successfully");
      } else {
        const errorData = await response.json();
        console.error("Error deleting restaurant:", errorData.error);
      }
    } catch (error) {
      console.error("Error during API request:", error);
    }
  };

  useEffect(() => {
    fetch("http://localhost:5000/restaurants")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setRestaurants(data);
        console.log(restaurants);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [loading]);

  return (
    <div>
      <div class="container-xl">
        <div class="table-responsive">
          <div class="table-wrapper">
            <div class="table-title">
              <div class="row">
                <div class="col-sm-6">
                  <h2>
                    Manage <b>Restaurants</b>
                  </h2>
                </div>
                <div class="col-sm-6">
                <Link to="/admin/add-restaurant" class="btn btn-success">
          <i class="material-icons"></i> <span>Add New Restaurant</span>
        </Link>
        <Link to="/admin/add-menu-item" class="btn btn-success">
          <i class="material-icons"></i> <span>Add Menu</span>
        </Link>
                </div>
              </div>
            </div>
            <table class="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Image</th>
                  <th>Cuisine</th>
                  <th>Address</th>
                  <th>Ratings</th>
                  <th>Actions</th>
                </tr>
              </thead>
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p>Error: {error.message}</p>
              ) : restaurants.length > 0 ? (
                <tbody>
                  {restaurants.map((restaurant) => (
                    <tr>
                      <td>{restaurant.name}</td>
                      <td>
                        {" "}
                        <img
                          className="resimagetable"
                          src={restaurant.image}
                          alt="restaurant-img"
                        />
                      </td>

                      <td>{restaurant.cuisine}</td>
                      <td>{restaurant.address}</td>
                      <td>{restaurant.ratings}/5</td>
                      <td>
                        <Link
                          to={`/editrestaurant/${restaurant.restaurantId}`}
                          class="edit"
                          data-toggle="modal"
                        >
                          <i
                            class="material-icons"
                            data-toggle="tooltip"
                            title=""
                            data-original-title="Edit"
                          >
                            
                          </i>
                        </Link>
                        <a
                          onClick={() => handleDelete(restaurant._id)}
                          class="delete"
                          data-toggle="modal"
                        >
                          <i
                            class="material-icons"
                            data-toggle="tooltip"
                            title=""
                            data-original-title="Delete"
                          >
                            
                          </i>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              ) : (
                <p>No restaurants to display.</p>
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
