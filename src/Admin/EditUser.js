
import React, { useState, useEffect } from "react";
import "./EditUser.css";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function EditUser() {
  const { userId } = useParams();
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/user/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
        console.log(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const response = await fetch(`http://localhost:5000/userupdate/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const updateduser = await response.json();
      console.log("user details updated:", updateduser);
      navigate("/admin/manageusers");
    } else {
      const errorData = await response.json();
      console.error("Error updating user details:", errorData.error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="col-6 my-5">
        <div className="formdiv mb-3">
          <label className="ml-3">Username</label>
          <input
            type="text"
            className="form-control"
            defaultValue={user.username}
            {...register("username", { required: true })}
            placeholder="Username"
          />
        </div>
        <div className="formdiv mb-3">
          <label className="ml-3">First name</label>

          <input
            {...register("fname", { required: true })}
            className="form-control"
            defaultValue={user.fname}
            placeholder="fname"
          />
        </div>

        <div className="formdiv mb-3">
          <label className="ml-3">Last name</label>

          <input
            {...register("lname", { required: true })}
            className="form-control"
            defaultValue={user.lname}
            placeholder="Last name"
          />
        </div>

        <div className="formdiv mb-3">
          <label className="ml-3">Email</label>
          <input
            type="email"
            className="form-control"
            defaultValue={user.email}
            {...register("email", { required: true })}
            placeholder="Email"
          />
        </div>

        <div className="formdiv mb-3">
          <label className="ml-3">Phone Number</label>
          <input
            type="number"
            className="form-control"
            defaultValue={user.phoneNumber}
            {...register("phoneNumber", { required: true })}
            placeholder="phoneNumber"
          />
        </div>

        <button type="submit" className="btn btn-primary mb-3" value="Sign in">
          Update
        </button>
      </form>
    </div>
  );
}