import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  fetchUserProfile,
  updateUserProfile,
} from "../features/slice/UserDetailsSlice";
import { loginUser } from "../features/slice/UserLoginSlice";

const UpdateProfileScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.userDetails);
  const { user: loggedInUser } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (!loggedInUser) {
      navigate("/login");
    } else {
      dispatch(fetchUserProfile());
    }
  }, [loggedInUser, dispatch, navigate]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        password: "",
        confirmPassword: "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
    } else {
      dispatch(
        updateUserProfile({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        })
      ).then(() => {
        dispatch(
          loginUser({ username: formData.email, password: formData.password })
        ).then(() => {
          navigate("/profile");
        });
      });
    }
  };

  return (
    <div>
      <Link to="/profile" className="btn btn-light my-3">
        <i className="fas fa-arrow-left"> </i>
        Go Back
      </Link>
      <div className="container">
        <div className="row">
          <div className="flex col-md-6 offset-md-3">
            <h2 className="text-center">Profile</h2>
            {error && <div className="alert alert-danger">{error.detail || error}</div>}
            <form onSubmit={handleSubmit} className="flex mt-4">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group mt-3">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group mt-3">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Old or New Password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group mt-3">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  className="form-control"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary mt-4 rounded"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfileScreen;
