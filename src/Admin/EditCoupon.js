import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

export default function EditCoupon() {
  const { couponId } = useParams();

  const [coupon, setCoupon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/coupon/${couponId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setCoupon(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [couponId]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      code: coupon.code,
      discount: coupon.discount,
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.put(`http://localhost:5000/couponupdate/${couponId}`, data);
      if (response.status === 200) {
        console.log('Coupon details updated:', response.data);
        navigate('/admin/managecoupons');
      }
    } catch (error) {
      console.error('Error updating coupon details:', error);
    }
  };

  return (
    <div className="edit-user-container" style={{ backgroundColor: 'white', padding: '20px', margin: '20px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
      <form onSubmit={handleSubmit(onSubmit)} className="col-6 my-5 signup-form">
        <div className="formdiv mb-3">
          <label className="ml-3">Coupon Code</label>
          <input
            type="text"
            className={`form-control ${errors && errors.code ? 'is-invalid' : ''}`}
            defaultValue={coupon.code}
            {...register('code', { required: true })}
            placeholder="Coupon Code"
          />
          {errors && errors.code && <div className="invalid-feedback">{errors.code.message}</div>}
        </div>
        <div className="formdiv mb-3">
          <label className="ml-3">Discount Value</label>
          <input
            type="text"
            className={`form-control ${errors && errors.discount ? 'is-invalid' : ''}`}
            defaultValue={coupon.discount}
            {...register('discount', { required: true })}
            placeholder="Discount Value"
          />
          {errors && errors.discount && <div className="invalid-feedback">{errors.discount.message}</div>}
        </div>

        <button type="submit" className="btn btn-primary mb-3">
          Update
        </button>
      </form>
    </div>
  );
}
