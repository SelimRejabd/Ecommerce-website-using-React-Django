import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../features/slice/UserLoginSlice";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.user);

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(loginUser(credentials));
  };
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const renderErrorMessage = (error) => {
    if (typeof error === 'string') {
        return error;
    } else if (typeof error === 'object' && error !== null) {
        return error.detail || JSON.stringify(error);
    }
    return 'An unexpected error occurred';
};

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mt-5">Login</h2>
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                className="form-control"
                value={credentials.username}
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
                value={credentials.password}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary mt-4 w-30"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            {error && <div className="alert alert-danger mt-3">{renderErrorMessage(error)}</div>}
            <div className="mt-3 text-center">
              <span>Don't have an account? </span>
              <Link to="/register">Register here</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
