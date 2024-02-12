import React, { useState, useEffect } from 'react';
import { Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ViewCart = () => {

  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editedQuantity, setEditedQuantity] = useState('');

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/cart');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCartItems(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const handleEditQuantity = async (itemId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/cart/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity: editedQuantity }),
      });

      if (!response.ok) {
        throw new Error('Failed to update quantity');
      }

      // Update the local state after successful API call
      setCartItems((prevItems) =>
        prevItems.map((item) => (item._id === itemId ? { ...item, quantity: editedQuantity } : item))
      );

      // Reset editedQuantity to empty string after successful update
      setEditedQuantity('');
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this item?');
      
      if (!confirmDelete) {
        return;
      }

      const response = await fetch(`http://localhost:5000/api/cart/${itemId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete item');
      }

      // Update the local state after successful API call
      setCartItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div style={{marginBottom:'280px'}}>
      <h1>View Cart</h1>
      <div className="view-cart-container">
        <div className="view-cart-box">
          {loading ? (
            <p>Loading cart items...</p>
          ) : error ? (
            <p>Error: {error.message}</p>
          ) : cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <table className="view-cart-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Change Quantity</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>${item.price}</td>
                    <td>{item.quantity}</td>
                    <td>
                      <input
                        type="number" min="1"
                        value={editedQuantity} className="edit-input"
                        onChange={(e) => setEditedQuantity(e.target.value)}
                      />
                      <button
                        className="view-crt-button"
                        onClick={() => handleEditQuantity(item._id)}
                      >
                        Update
                      </button>
                    </td>
                    <td>
                      <button
                        className="view-crt-button"
                        onClick={() => handleDeleteItem(item._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="viewcart-btn-grp">
      <button className="confirm-order" onClick={() => navigate(-1)}>
        Back to Menu
      </button>
      <Link to={`/myorder`}>
        <button className="confirm-order">Confirm Order</button>
      </Link>
    </div>
     </div>
    </div>
  );
};

export default ViewCart;
