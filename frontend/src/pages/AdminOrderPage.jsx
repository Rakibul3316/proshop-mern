import React, { useEffect } from "react";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deliverOrder,
  getOrderDetails,
  resetDeliverOrder,
  resetPaymentOrder,
} from "../slices/orderSlice.js";

// Component
import Message from "../components/Message.jsx";
import Loader from "../components/Loader.jsx";
import SmallLoader from "../components/SmallLoader.jsx";

function AdminOrderPage() {
  const { order, loading, error } = useSelector((state) => state.order);
  const { deliverLoading, deliverError, deliverSuccess } = useSelector(
    (state) => state.order
  );

  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderDetails(id));

    if (deliverSuccess) {
      dispatch(resetDeliverOrder());
    }
  }, [dispatch, id, deliverSuccess]);

  const handleDeliver = (orderId) => {
    dispatch(deliverOrder(orderId));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <h1>Order {order._id}</h1>
          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>Shipping</h2>
                  <p>
                    <strong>Name: </strong>{" "}
                    {order.user_id && order.user_id.name}
                  </p>
                  <p>
                    <strong>Email: </strong>{" "}
                    <a href={`mailto: ${order.user_id && order.user_id.email}`}>
                      {order.user_id && order.user_id.email}
                    </a>
                  </p>
                  <p>
                    <strong>Address: </strong>
                    {order.shipping_address &&
                      order.shipping_address.address},{" "}
                    {order.shipping_address && order.shipping_address.city}{" "}
                    {order.shipping_address &&
                      order.shipping_address.postalCode}
                    , {order.shipping_address && order.shipping_address.country}
                  </p>
                  {order.isDelivered ? (
                    <Message variant="success">
                      Delivered on {order.delivered_at}
                    </Message>
                  ) : (
                    <Message variant="danger">Not Delivered</Message>
                  )}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Payment Method</h2>
                  <p>
                    <strong>Method: </strong>
                    {order.payment_method}
                  </p>
                  {order.isPaid ? (
                    <Message variant="success">Paid on {order.paid_at}</Message>
                  ) : (
                    <Message variant="danger">Not Paid</Message>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2>Order Items</h2>
                  {order.order_items && order.order_items.length === 0 ? (
                    <Message>Order is empty</Message>
                  ) : (
                    <ListGroup variant="flush">
                      {order.order_items &&
                        order.order_items.map((item, idx) => (
                          <ListGroup.Item key={item._id}>
                            <Row>
                              <Col md={1}>
                                <Image
                                  src={
                                    item.product_image &&
                                    item.product_image.image_url
                                  }
                                  alt={item.product_name}
                                  fluid
                                  rounded
                                />
                              </Col>
                              <Col>
                                <Link to={`/products/${item._id}`}>
                                  {item.product_name}
                                </Link>
                              </Col>
                              <Col md={4}>
                                {item.qty} X $ {item.product_price} = $
                                {item.qty * item.product_price}
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
                      <Col>${order.items_price}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>${order.shipping_price}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Tax</Col>
                      <Col>${order.tax_price}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Total</Col>
                      <Col>${order.total_price}</Col>
                    </Row>
                  </ListGroup.Item>
                  {order.isPaid && (
                    <ListGroup.Item>
                      <Button
                        onClick={() => handleDeliver(order._id)}
                        style={{ width: "100%" }}
                      >
                        {deliverLoading ? <SmallLoader /> : "Mark as Delivered"}
                      </Button>
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
}

export default AdminOrderPage;
