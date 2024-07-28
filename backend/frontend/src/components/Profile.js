import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUserProfile } from '../features/slice/UserDetailsSlice';
import { logout } from '../features/slice/UserLoginSlice';
import { fetchMyOrders } from '../features/slice/OrderSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, error: userError } = useSelector((state) => state.userDetails);
  const { user: loggedInUser } = useSelector((state) => state.user);
  const { orders, loading: ordersLoading, error: ordersError } = useSelector((state) => state.order);

  useEffect(() => {
    if (!loggedInUser) {
      navigate('/login');
    } else {
      dispatch(fetchUserProfile());
      dispatch(fetchMyOrders());
    }
  }, [loggedInUser, dispatch, navigate]);

  const handleUpdateButton = () => {
    navigate('/profile/update');
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="container">
      <div className="row">
        <div className="flex col-md-6 offset-md-3">
          <h2 className="text-center">Profile</h2>
          {userError && (
            <div className="alert alert-danger">{userError.detail || userError}</div>
          )}
          {user === null ? (
            <div>Please login</div>
          ) : (
            <div>
              <div className="mt-4">
                <div className="form-group">
                  <label htmlFor="name">Name: {user.name}</label>
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="email">Email: {user.email}</label>
                </div>
                <button
                  type="button"
                  className="btn btn-primary mt-4 w-100"
                  onClick={handleUpdateButton}
                >
                  Update
                </button>
              </div>
              <div>
                <div className="flex">My Orders</div>
                {ordersLoading ? (
                  <div>Loading...</div>
                ) : ordersError ? (
                  <div className="alert alert-danger">{ordersError}</div>
                ) : (
                  <div className="list-group mt-3">
                    {orders.map((order) => (
                      <div key={order._id} className="list-group-item">
                        <h5>Order {order._id}</h5>
                        <p>
                          <strong>Items:</strong>
                          <ul>
                            {order.orderItems.map((item) => (
                              <li key={item._id}>
                                {item.qty} x {item.name} - ${item.price}
                              </li>
                            ))}
                          </ul>
                        </p>
                        <p>
                          <strong>Total Price:</strong> ${order.totalPrice}
                        </p>
                        <p>
                          <strong>Shipping Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                        </p>
                        <p>
                          <strong>Payment Method:</strong> {order.paymentMethod}
                        </p>
                        <p>
                          <strong>Is Paid:</strong> {order.isPaid ? 'Yes' : 'No'}
                        </p>
                        <p>
                          <strong>Is Delivered:</strong> {order.isDelivered ? 'Yes' : 'No'}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <button
                type="button"
                className="btn btn-secondary mt-3 w-100"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
