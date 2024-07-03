import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../features/slice/CartSlice";
import CheckoutSteps from "../components/CheckoutSteps";

const Payment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingAddress } = useSelector((state) => state.cart);
  const [paymentMethod, setPaymentMethod] = useState("Rocket");

  if (!shippingAddress.address) {
    navigate("/shipping");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
        <div className="container mt-5">
          <CheckoutSteps step1 step2 step3/>
          <h2>Payment Method</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label as="legend" className="mt-3">
                Select Method
              </Form.Label>
              <Col>
                <Form.Check
                  type="radio"
                  label="Rocket"
                  id="Rocket"
                  name="paymentMethod"
                  value="Rocket"
                  checked={paymentMethod === "Rocket"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mt-3"
                />
                <Form.Check
                  type="radio"
                  label="Bkash"
                  id="Bkash"
                  name="paymentMethod"
                  value="Bkash"
                  checked={paymentMethod === "Bkash"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mt-3"
                />
                <Form.Check
                  type="radio"
                  label="Nagad"
                  id="Nagad"
                  name="paymentMethod"
                  value="Nagad"
                  checked={paymentMethod === "Nagad"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mt-3"
                />
              </Col>
            </Form.Group>
            <Button type="submit" variant="primary" className="mt-4">
              Continue
            </Button>
          </Form>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Payment;
