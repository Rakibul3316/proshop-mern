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
        <Link to={`/products/${product._id}`}>
          <Card.Img
            src={product.product_image}
            variant="top"
            style={{ padding: "15px", paddingBottom: "0px" }}
          />
        </Link>

        <Card.Body>
          <Link to={`/products/${product._id}`}>
            <Card.Title as="div">
              <strong style={{ fontSize: "18px" }}>
                {product.product_name}
              </strong>
            </Card.Title>
          </Link>

          <Card.Text as="div">
            <Rating
              value={product.product_avg_rating}
              text={`${product.number_of_reviews} reviews`}
            />
          </Card.Text>
          <Card.Text as="h3">${product.product_price}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default Product;
