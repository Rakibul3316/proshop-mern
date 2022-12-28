// Parent Component => App
import { React, useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import axios from "axios";

// Component
import Product from "../components/Product";

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get("/api/products");
      setProducts(res.data.data);
    };

    fetchProducts();
  }, []);
  return (
    <>
      <h1 className="mb-4">Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} xl={3} lg={4}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomePage;
