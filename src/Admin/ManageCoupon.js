import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

export default function ManageCoupons() {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleDelete = async (couponId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/deleteCoupon/${couponId}`);

      if (response.status === 200) {
        setLoading(!loading);
        console.log(`Coupon with ID ${couponId} deleted successfully`);
      } else {
        const errorData = await response.json();
        console.error("Error deleting coupon:", errorData.error);
      }
    } catch (error) {
      console.error("Error during API request:", error);
    }
  };

  useEffect(() => {
    axios.get("http://localhost:5000/getCoupons")
      .then((response) => {
        if (!response.data) {
          throw new Error("No data received");
        }
        setCoupons(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [loading]);

  return (
    <div>
      <div className="container-xl">
        <div className="table-responsive">
          <div className="table-wrapper">
            <div className="table-title">
              <div className="row">
                <div className="col-sm-6">
                  <h2>
                    Manage <b>Coupons</b>
                  </h2>
                </div>
                <div className="col-sm-6">
                  <Link to="/admin/add-coupon" className="btn btn-success">
                    <i className="material-icons"></i> <span>Add New Coupon</span>
                  </Link>
                </div>
              </div>
            </div>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Discount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p>Error: {error.message}</p>
              ) : coupons.length > 0 ? (
                <tbody>
                  {coupons.map((coupon) => (
                    <tr key={coupon._id}>
                      <td>{coupon.code}</td>
                      <td>{coupon.discount}% off</td>
                      <td>
                        <Link to={`/editcoupon/${coupon._id}`} className="edit" data-toggle="modal">
                          <i className="material-icons" data-toggle="tooltip" title="Edit">
                            
                          </i>
                        </Link>
                        <a
                          onClick={() => handleDelete(coupon._id)}
                          className="delete"
                          data-toggle="modal"
                        >
                          <i
                            className="material-icons"
                            data-toggle="tooltip"
                            title="Delete"
                          >
                            
                          </i>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              ) : (
                <p>No coupons to display.</p>
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
