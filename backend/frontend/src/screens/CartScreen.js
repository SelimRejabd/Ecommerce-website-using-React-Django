import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateItemQuantity, clearCart } from "../features/slice/CartSlice";
import { ListGroup, Row, Col, Image, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CartScreen = () => {
  const items = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemoveItem = (itemId) => {
    dispatch(removeItem(itemId));
  };

  const handleQuantityChange = (itemId, qty) => {
    dispatch(updateItemQuantity({ itemId, qty }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleProceedToCheckout = () => {
    navigate('/shipping');
  };

  return (
    <div>
      <h2>Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ListGroup variant="flush">
            {items.map((item) => (
              <ListGroup.Item key={item._id}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.image} fluid rounded />
                  </Col>
                  <Col md={4}>
                    {item.name}
                  </Col>
                  <Col md={2}>
                    ${item.price}
                  </Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) => handleQuantityChange(item._id, Number(e.target.value))}
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button variant="danger" onClick={() => handleRemoveItem(item._id)}>
                      Remove
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <Row className="mt-3">
            <Col md={4}>
              <h5 className="text-right">Total: ${totalPrice.toFixed(2)}</h5>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col md={4}>
            <Button variant="primary" onClick={handleProceedToCheckout} className="mt-2">
                Proceed to Checkout
              </Button>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col md={4}>
              <Button variant="danger" onClick={handleClearCart}>
                Clear Cart
              </Button>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default CartScreen;
