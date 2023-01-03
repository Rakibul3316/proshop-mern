import React, { useEffect } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import { addToCart } from "../slices/cartSlice";

// Component
import Message from "../components/Message";

const CartPage = () => {
  let { id } = useParams(),
    [queryParams] = useSearchParams(),
    qty = Number(queryParams.get("qty"));

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  console.log("cart item >>", cartItems);

  useEffect(() => {
    if (id) {
      dispatch(addToCart({ id, qty }));
    }
  }, [dispatch, id, qty]);

  return <div>CartPage update</div>;
};

export default CartPage;
