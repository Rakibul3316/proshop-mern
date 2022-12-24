// Parent component => Home page
import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

// Components
import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <>
      <Card className="mb-4" style={{ borderRadius: "5px" }}>
        <Link to={`/product/${product._id}`}>
          <Card.Img
            src={product.image}
            variant="top"
            style={{ padding: "15px", paddingBottom: "0px" }}
          />
        </Link>

        <Card.Body>
          <Link to={`/product/${product._id}`}>
            <Card.Title as="div">
              <strong style={{ fontSize: "18px" }}>{product.name}</strong>
            </Card.Title>
          </Link>

          <Card.Text as="div">
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
          </Card.Text>
          <Card.Text as="h3">${product.price}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default Product;
