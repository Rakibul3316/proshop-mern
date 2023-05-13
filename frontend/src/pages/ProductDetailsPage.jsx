// Parent component => App
import { React, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../slices/productDetailsSlice";
import { useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Button,
  Form,
} from "react-bootstrap";

// Component
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { addToCart } from "../slices/cartSlice";
import { createReview, resetCreateReview } from "../slices/productsSlice";

const ProductDetailsPage = () => {
  const [qty, setQty] = useState(1),
    [rating, setRating] = useState(0),
    [comment, setComment] = useState(""),
    navigate = useNavigate(),
    { id } = useParams();
  const dispatch = useDispatch();

  const { product, loading, error } = useSelector((state) => state.product);
  const { productReviewLoading, productReviewError, productReviewSuccess } =
    useSelector((state) => state.products);
  const {
    userInfo,
    loading: userLoading,
    success: userSuccess,
    error: userError,
  } = useSelector((state) => state.userLogIn);

  useEffect(() => {
    if (productReviewSuccess) {
      alert("Review Submitted!");
      setComment("");
      setRating(0);
      dispatch(resetCreateReview());
    } else {
      // dispatch(fetchProduct(id));
    }
    if (!product.product_name || product._id !== id) {
      dispatch(fetchProduct(id));
    }
  }, [dispatch, id, product.product_name, product._id, productReviewSuccess]);

  const addToCartHandler = () => {
    dispatch(addToCart({ id, qty: Number(qty) }));
    navigate("/cart");
  };

  const reviewSubmit = (e) => {
    e.preventDefault();
    let payload = {
      _id: id,
      rating,
      comment,
    };
    dispatch(createReview(payload));
  };

  return (
    <>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            <Col md={6}>
              <Image
                src={product.product_image && product.product_image.image_url}
                alt={product.product_name}
                fluid
                style={{ width: "530px", height: "400px" }}
              />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.product_name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.product_avg_rating}
                    text={`${product.number_of_reviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.product_price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.product_description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col>
              <Card>
                <ListGroup>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price: </Col>
                      <Col>
                        <strong>${product.product_price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status: </Col>
                      <Col>
                        {product.product_stock_count > 0
                          ? "In Stock"
                          : "Out of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.product_stock_count > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Quantity</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.product_stock_count).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item className="text-center">
                    <Button
                      onClick={addToCartHandler}
                      className="btn"
                      type="button"
                      style={{ width: "100%" }}
                      disabled={product.product_stock_count === 0}
                    >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row style={{ marginTop: "40px" }}>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.product_reviews?.length === 0 && (
                <Message variant="info">No Reviews</Message>
              )}
              <ListGroup variant="flush">
                {product.product_reviews?.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.reviewer_name}</strong>
                    <Rating value={review.reviewer_rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.reviewer_comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>
                  {productReviewError && (
                    <Message variant="danger">{productReviewError}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={reviewSubmit}>
                      <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Select ......</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows="3"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button type="submit" variant="primary">
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      {" "}
                      Please <Link to="/login"> sign in </Link>to write a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductDetailsPage;
