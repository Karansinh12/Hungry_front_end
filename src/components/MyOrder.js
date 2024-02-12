import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const MyOrder = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

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

        // Calculate total
        const totalAmount = data.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotal(totalAmount);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const calculateTotal = (items) => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const formatOrderItems = (items) => {
    return items.map((item) => ({
      _id: item._id,
      name: item.name,
      description: item.description,
      price: item.price,
      quantity: item.quantity,
    }));
  };

  const handleConfirmOrder = async () => {
    try {
      // Calculate total using the calculateTotal function
      const total = calculateTotal(cartItems);

      // Format items for the order
      const orderItems = formatOrderItems(cartItems);

      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: orderItems,
          total: total,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to confirm order');
      }

      // If the order is confirmed successfully, navigate to the /myorder route
      navigate('/add-address');
    } catch (error) {
      console.error('Error confirming order:', error);
    }
  };

  return (
    <div style={{marginBottom:'300px'}}>
      <h1>My Order</h1>
      <div className="my-order-container">
        <div className="order-summary">
          <h2>Order Summary</h2>
          {loading ? (
            <p>Loading cart items...</p>
          ) : error ? (
            <p>Error: {error.message}</p>
          ) : cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <>
              <table className="table order-summary-table mx-auto">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item._id}>
                      <td>{item.name}</td>
                      <td>${item.price}</td>
                      <td>{item.quantity}</td>
                      <td>${item.price * item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p>Total: ${total}</p>
              <div className="confirm-btn-group">
                <button className="btn btn-primary confirm-order" onClick={handleConfirmOrder}>
                  Confirm Order
                </button>
                <button className="btn ml-4 btn-secondary confirm-order" onClick={() => navigate(-1)}>
                  Back to Menu
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyOrder;
