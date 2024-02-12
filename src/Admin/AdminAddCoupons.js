import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddCoupon = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    code: '',
    discount: '',
  });

  const [addCouponStatus, setAddCouponStatus] = useState(null);

  const [errors, setErrors] = useState({
    code: '',
    discount: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (formData.code.trim() === '') newErrors.code = 'Coupon code is required';
    if (formData.discount.trim() === '') newErrors.discount = 'Discount value is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        await axios.post('http://localhost:5000/api/add-coupon', formData);
        setAddCouponStatus('success');
        navigate('/admin/managecoupons');
      } catch (error) {
        console.error('Error adding coupon:', error);
        setAddCouponStatus('error');
      }
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="coupon-form-container" style={{ backgroundColor: 'white', padding: '20px', margin: '20px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <h2>Add Coupon</h2>
            {addCouponStatus === 'success' && (
              <div className="alert alert-success">Coupon added successfully!</div>
            )}
            {addCouponStatus === 'error' && (
              <div className="alert alert-danger">Coupon addition failed. Please try again.</div>
            )}
            <form className="coupon-form" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="code" className="form-label">Coupon Code:</label>
                <input
                  type="text"
                  id="code"
                  name="code"
                  value={formData.code}
                  onChange={handleInputChange}
                  className={`form-control ${errors.code && 'is-invalid'}`}
                />
                {errors.code && <div className="invalid-feedback">{errors.code}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="discount" className="form-label">Discount Value:</label>
                <input
                  type="text"
                  id="discount"
                  name="discount"
                  value={formData.discount}
                  onChange={handleInputChange}
                  className={`form-control ${errors.discount && 'is-invalid'}`}
                />
                {errors.discount && <div className="invalid-feedback">{errors.discount}</div>}
              </div>
              <center>
                <button className="btn bg-dark text-warning " type="submit">Add Coupon</button>
              </center>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCoupon;
