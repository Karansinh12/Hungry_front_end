import React, { useState, useEffect } from "react";
import "./ManageUsers.css";
import { Link } from "react-router-dom";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleDelete = async (userId) => {
    console.log(userId);
    try {
      const response = await fetch(
        `http://localhost:5000/userdelete/${userId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setLoading(!loading);
        console.log("user deleted successfully");
      } else {
        const errorData = await response.json();
        console.error("Error deleting user:", errorData.error);
      }
    } catch (error) {
      console.error("Error during API request:", error);
    }
  };

  useEffect(() => {
    fetch("http://localhost:5000/getallusers")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        console.log(users);
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
                    Manage <b>users</b>
                  </h2>
                </div>
                <div class="col-sm-6">
                <Link to="/admin/add-user" class="btn btn-success">
          <i class="material-icons"></i> <span>Add New User</span>
        </Link>
                </div>
              </div>
            </div>
            <table class="table table-striped table-hover">
              <thead>
                <tr>
                  <th>User Name</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p>Error: {error.message}</p>
              ) : users.length > 0 ? (
                <tbody>
                  {users.map((user) => (
                    <tr>
                      <td>{user.username}</td>

                      <td>{user.fname}</td>
                      <td>{user.lname}</td>
                      <td>{user.email}</td>
                      <td>{user.phoneNumber}</td>
                      <td>
                        <Link
                          to={`/edituser/${user._id}`}
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
                          onClick={() => handleDelete(user._id)}
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
                <p>No users to display.</p>
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
