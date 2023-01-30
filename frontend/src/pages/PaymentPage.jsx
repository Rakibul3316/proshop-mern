import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// Component
import FormContainer from "../components/FormContainer";
import CheckOutSteps from "../components/CheckOutSteps";

// Action
import { savePaymentMethod } from "../slices/cartSlice";

const PaymentPage = () => {
  const cart = useSelector((state) => state.cart),
    { shippingAddress } = cart;

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch(),
    navigate = useNavigate();

  useEffect(() => {
    if (!shippingAddress) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod({ method: paymentMethod }));
    navigate("/placeorder");
  };

  return (
    <FormContainer>
      <CheckOutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>

          <Col>
            <Form.Check
              type="radio"
              label="PayPal or Cardit Card"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              checked
              onChange={(e) => setPaymentMethod(e.target.name)}
            ></Form.Check>

            <Form.Check
              type="radio"
              label="Stripe"
              id="Stripe"
              name="paymentMethod"
              value="Stripe"
              onChange={(e) => setPaymentMethod(e.target.name)}
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button className="mt-3" type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentPage;
