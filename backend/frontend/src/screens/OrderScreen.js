import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { ListGroup, Row, Col, Image, Card, Button } from "react-bootstrap";
import {
  getOrderById,
  updateOrderToDelivered,
} from "../features/slice/OrderSlice";

const OrderScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    orderData: order,
    loading,
    error,
  } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getOrderById(id));
  }, [id, dispatch]);

  const markAsDeliveredHandler = (orderId) => {
    dispatch(updateOrderToDelivered(orderId));
    dispatch(getOrderById(id));
  };

  const handleBack = () => {
    navigate(-1);
  }

  return (
    <div className="container">
      <Button className="btn btn-light " onClick={handleBack}><i className="fas fa-arrow-left"></i> Go Back</Button>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>
          {error && (
            <div className="alert alert-danger">{error.detail || error}</div>
          )}
        </p>
      ) : (
        order && (
          <div>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h1>Order: {order._id}</h1>
              </ListGroup.Item>
            </ListGroup>

            <Row>
              <Col md={8}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h2>Shipping</h2>
                    <p>
                      <strong>Name: </strong>
                      {order.user.name}
                    </p>
                    <p>
                      <strong>Email: </strong>
                      {order.user.email}
                    </p>
                    <p>
                      <strong>Address: </strong>
                      {order.shippingAddress.address},{" "}
                      {order.shippingAddress.city}{" "}
                      {order.shippingAddress.postalCode},{" "}
                      {order.shippingAddress.country}
                    </p>

                    {order.isDelivered ? (
                      <p className="alert alert-success">
                        <strong>Delivered on: </strong>
                        {order.deliveredAt
                          ? order.deliveredAt.toString().substring(0, 10)
                          : null}
                      </p>
                    ) : (
                      <p className="alert alert-warning">Not Delivered</p>
                    )}
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <h2>Payment Method</h2>
                    <p>
                      <strong>Method: </strong>
                      {order.paymentMethod}
                    </p>

                    {order.isPaid ? (
                      <p className="alert alert-success">
                        <strong>Paid on: </strong>
                        {order.paidAt
                          ? order.paidAt.toString().substring(0, 10)
                          : null}
                      </p>
                    ) : (
                      <p className="alert alert-warning">Not Paid</p>
                    )}
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <h2>Order Items</h2>
                    {order.orderItems.length === 0 ? (
                      <p>Your order is empty</p>
                    ) : (
                      <ListGroup variant="flush">
                        {order.orderItems.map((item, index) => (
                          <ListGroup.Item key={index}>
                            <Row>
                              <Col md={2}>
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  fluid
                                  rounded
                                />
                              </Col>
                              <Col md={6}>{item.name}</Col>
                              <Col md={4}>
                                {item.qty} x ${item.price} = $
                                {(item.qty * item.price).toFixed(2)}
                              </Col>
                            </Row>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={4}>
                <Card>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <h2>Order Summary</h2>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Items</Col>
                        <Col>${order.totalPrice}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Shipping</Col>
                        <Col>${order.shippingPrice}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Tax</Col>
                        <Col>${order.taxPrice}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Total</Col>
                        <Col>${order.totalPrice}</Col>
                      </Row>
                    </ListGroup.Item>
                    {order && !order.isDelivered ? (
                      <ListGroup.Item>
                        <Row>
                          <Button
                            type="button"
                            className="btn btn-block"
                            onClick={() => markAsDeliveredHandler(order._id)}
                          >
                            Mark as Delivered
                          </Button>
                        </Row>
                      </ListGroup.Item>
                    ) : null}
                  </ListGroup>
                </Card>
              </Col>
            </Row>
          </div>
        )
      )}
    </div>
  );
};

export default OrderScreen;
