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

const ProductDetailsPage = () => {
  let [qty, setQty] = useState(1),
    navigate = useNavigate(),
    { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProduct(id));
  }, [dispatch, id]);

  const addToCartHandler = () => {
    dispatch(addToCart({ id, qty: Number(qty) }));
    navigate("/cart");
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
        <Row>
          <Col md={6}>
            <Image
              src={product.product_image.image_url}
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
      )}
    </>
  );
};

export default ProductDetailsPage;
