import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserProfile } from "../features/slice/UserDetailsSlice";
import { fetchMyOrders } from "../features/slice/OrderSlice";
import { Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, error: userError } = useSelector((state) => state.userDetails);
  const { user: loggedInUser } = useSelector((state) => state.user);
  const {
    orders,
    loading: ordersLoading,
    error: ordersError,
  } = useSelector((state) => state.order);

  useEffect(() => {
    if (!loggedInUser) {
      navigate("/login");
    } else {
      dispatch(fetchUserProfile());
      dispatch(fetchMyOrders());
    }
  }, [loggedInUser, dispatch, navigate]);

  const handleUpdateButton = () => {
    navigate("/profile/update");
  };


  return (
    <div className="container">
      <div className="row">
        <div className="flex col-md-6 offset-md-3">
          <h2 className="text-center">Profile</h2>
          {userError && (
            <div className="alert alert-danger">
              {userError.detail || userError}
            </div>
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
                  className="btn btn-primary mt-4 rounded"
                  onClick={handleUpdateButton}
                >
                  Update
                </button>
              </div>

              {/* My orders */}

              <div>
                <h2 className="flex mt-5 text-center">My Orders</h2>
                {ordersLoading ? (
                  <div>Loading...</div>
                ) : ordersError ? (
                  <div className="alert alert-danger">{ordersError}</div>
                ) : (
                  <Table striped bordered hover responsive className="table-sm">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Total</th>
                        <th>Paid</th>
                        <th>Delivered</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order._id}>
                          <td>{order._id}</td>
                          <td>{order.createdAt === null ?<></> : order.createdAt.substring(0, 10) }</td>
                          <td>{order.totalPrice}</td>
                          <td>
                            {order.isPaid ? (
                              <i
                                className="fas fa-check"
                                style={{ color: "green" }}
                              ></i>
                            ) : (
                              <i
                                className="fas fa-times"
                                style={{ color: "red" }}
                              ></i>
                            )}
                          </td>
                          <td>
                            <LinkContainer to={`/order/${order._id}`}>
                              <Button  className="btn btn-primary rounded">
                                Details
                              </Button>
                            </LinkContainer>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
