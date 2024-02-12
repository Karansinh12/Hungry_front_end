import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ReviewForm = ({ onSubmit, review, selectedRating, onReviewChange, onRatingChange }) => (
  <div className="container mt-4 shadow mb-4 p-3">
    <h2 className="text-center">Write a Review</h2>
    <form onSubmit={onSubmit}>
      <div className="mb-3">
        <textarea
          className="form-control"
          placeholder="Write your review..."
          value={review}
          onChange={onReviewChange}
          required
        />
      </div>
      <div className="mb-3">
        <select
          id="rating"
          className="form-select"
          value={selectedRating}
          onChange={onRatingChange}
          required
        >
          {[1, 2, 3, 4, 5].map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
      <button className="btn bg-warning text-dark fw-bold" type="submit">
        Submit Review
      </button>
    </form>
  </div>
);

const Menu = () => {
  const { restaurantId } = useParams();
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState('1');

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!review || !selectedRating) {
      console.log('Please fill in both review and rating fields.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          restaurantId,
          review,
          rating: parseInt(selectedRating, 10), // Convert the selectedRating to an integer
        }),
      });

      console.log('Response:', response);

      if (!response.ok) {
        throw new Error('Failed to submit review');
      }

      setReview('');
      setSelectedRating('1'); // Reset to the initial value
      console.log('Review submitted successfully');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetch(`http://localhost:5000/menu/${restaurantId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setMenu(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [restaurantId]);

  return (
    <div>
      <h2 className="text-center mt-4">Menu for Restaurant</h2>
      <div className="container mt-4">
        {loading ? (
          <p>Loading menu...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : Array.isArray(menu) && menu.length > 0 ? (
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {menu.map((item, index) => (
              <div key={index} className="col" style={{marginTop:'30px'}}>
                <div className="card h-100 bg-white text-dark">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="card-img-top"
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">{item.description}</p>
                    <p className="card-text">Price: ${item.price}</p>
                    <Link to={`/menu/${restaurantId}/${index}`} className="btn bg-warning text-dark fw-bold">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No menu items to display.</p>
        )}
      </div>
      <ReviewForm
        onSubmit={handleReviewSubmit}
        review={review}
        selectedRating={selectedRating}
        onReviewChange={(e) => setReview(e.target.value)}
        onRatingChange={(e) => setSelectedRating(e.target.value)}
      />
    </div>
  );
};

export default Menu;
