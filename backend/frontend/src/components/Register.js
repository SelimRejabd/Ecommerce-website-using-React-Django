import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../features/slice/UserRegisterSlice";
import { loginUser } from "../features/slice/UserLoginSlice";
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    user: registeredUser,
    loading,
    error,
  } = useSelector((state) => state.userRegister);
  const { user: loggedInUser } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");

  const { name, email, password, confirmPassword } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(registerUser({ name, email, password }));
    }
  };

  useEffect(() => {
    if (registeredUser) {
      dispatch(
        loginUser({ username: formData.email, password: formData.password })
      );
    }
  }, [registeredUser, dispatch, formData.email, formData.password]);

  useEffect(() => {
    if (loggedInUser) {
      navigate("/");
    }
  }, [loggedInUser, navigate]);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mt-5">Register</h2>
          {message && <div className="alert alert-danger">{message}</div>}
          {error && (
            <div className="alert alert-danger">{error.detail || error}</div>
          )}
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                className="form-control"
                value={name}
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
                value={email}
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
                className="form-control"
                value={password}
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
                className="form-control"
                value={confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary mt-4 w-30"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
            <div className="mt-3 text-center">
              <span>Already have an account? </span>
              <Link to="/login">Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
