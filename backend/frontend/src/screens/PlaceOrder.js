import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListGroup, Row, Col, Image, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { saveOrder, resetOrder } from "../features/slice/OrderSlice";
import { clearCart } from "../features/slice/CartSlice";
import CheckoutSteps from "../components/CheckoutSteps";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress, paymentMethod, items, totalPrice } = cart;

  const itemTotalPrice = Number(totalPrice.toFixed(2));
  const shippingPrice = itemTotalPrice < 100 ? 10 : 20;
  const taxPrice = (0.01 * itemTotalPrice).toFixed(2);

  let price = Number(shippingPrice) + Number(taxPrice) + Number(itemTotalPrice);
  price = parseFloat(price.toFixed(2));

  const order = useSelector((state) => state.order.order);

  const placeOrderHandler = () => {
    const orderData = {
      orderItems: items,
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod,
      itemsPrice: itemTotalPrice,
      shippingPrice: shippingPrice,
      taxPrice: taxPrice,
      totalPrice: price,
    };
    dispatch(saveOrder(orderData));
  };

  useEffect(() => {
    if (order) {
      navigate(`/order/${order._id}`);
      dispatch(clearCart());
      dispatch(resetOrder());
    }
  }, [order, dispatch, navigate]);

  return (
    <div>
    <div className="container mt-5">
    <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {shippingAddress.address}, {shippingAddress.city}{" "}
                {shippingAddress.postalCode}, {shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {paymentMethod}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {items.length === 0 ? (
                <p>Your cart is empty</p>
              ) : (
                <ListGroup variant="flush">
                  {items.map((item, index) => (
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
                  <Col>${itemTotalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${price}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={items.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
    </div>
  );
};

export default PlaceOrder;
