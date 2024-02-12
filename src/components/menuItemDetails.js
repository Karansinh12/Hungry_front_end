import React, { useState, useEffect } from 'react';
import { useParams, useRevalidator } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './css/menu.css';

const MenuItemDetails = () => {
  const params = useParams();
  const restaurantId = params.restaurantId;
  const index = params.index;
  const [menuItem, setMenuItem] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1); // new state variable for quantity
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchMenuItem = async () => {
      try {
        const response = await fetch(`http://localhost:5000/menu/${restaurantId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        if (!isNaN(index)) {
          setMenuItem(data[index]);

          setLoading(false);
        } else {
          setError(new Error('Invalid index or missing data'));
          setLoading(false);
        }
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
  
    fetchMenuItem();
  }, [restaurantId, index]);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    const cartItem = {
      name: menuItem.name,
      description: menuItem.description,
      price: menuItem.price * quantity,
      quantity: quantity
    };
  
    fetch('http://localhost:5000/api/cart/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'  // Specify the content type as JSON
      },
      body: JSON.stringify(cartItem)  // Convert the object to a JSON string
    })
    .then(response => response.json())
    .then(data => {
        setMessage('Item added to cart');
      // Handle success or display a message to the user
    })
    .catch((error) => {
      console.error('Error adding item to cart:', error);
      // Handle error or display an error message to the user
    });
  };

  return (
    <div>
    <div className="details-container">
      <div className="details-box">
        {loading ? (
          <p>Loading details...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          <div>
            <img src={menuItem.image} alt={menuItem.name} className="details-img" />
            <h2>{menuItem.name}</h2>
            <p>Description: {menuItem.description}</p>
            <p>Price: ${menuItem.price}</p>
            <div>
              <button onClick={handleDecrement} className="quantity">-</button>
              <span>&nbsp;&nbsp;{quantity}&nbsp;&nbsp;</span>
              <button onClick={handleIncrement} className="quantity">+</button>
            </div>
            <br></br>
            <div>
            Total:
            <span>&nbsp;&nbsp;{menuItem.price*quantity}&nbsp;&nbsp;</span>
            </div>
            <button onClick={handleAddToCart} className="add-to-cart">Add to Cart</button> 
            {message && <p>{message}</p>}
          </div>
        )}
      
      </div>
     
    </div>
     <div><Link to={`/cart`}>
     <button className="view-cart">View Cart</button> </Link></div>
     </div>
  );
};

export default MenuItemDetails;