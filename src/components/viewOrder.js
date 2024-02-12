import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './css/menu.css';

const ViewOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/orders');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setOrders(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleDeleteOrder = async (orderId) => {
    // Ask for confirmation before deleting
    const confirmDelete = window.confirm('Are you sure you want to cancel this order?');

    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete order');
        }

        // Remove the deleted order from the local state
        setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
      } catch (error) {
        console.error('Error deleting order:', error);
      }
    }
  };

  return (
    <div className="od-container">
      <h1>View Orders</h1>
      <div className="order-view-container">
        {loading ? (
          <p>Loading orders...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : orders.length === 0 ? (
          <p>No orders available</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Total</th>
                <th>Items</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>${order.total}</td>
                  <td>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {order.items.map((item) => (
                        <li key={item._id}>{item.name} - {item.quantity}</li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    <button
                      className="delete-order-btn"
                      onClick={() => handleDeleteOrder(order._id)}
                    >
                      Cancel Order
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div class="view-order-btn-grp">
        <Link to={`/cart`}>
          <button className="view-cart">View Cart</button>
        </Link>
        <Link to={`/restlist`}>
          <button className="view-cart">Back to Menu</button>
        </Link>
        <Link to={`/logout`}>
          <button className="view-cart">Logout</button>
        </Link>
      </div>
    </div>
  );
};

export default ViewOrder;
