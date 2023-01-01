// Parent Component => App
import { React, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../slices/productSlice";

// Component
import Product from "../components/Product";

const HomePage = () => {
  const dispatch = useDispatch();
  const productsList = useSelector((state) => state.products);
  const { products, loading, error } = productsList;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      <h1 className="mb-4">Latest Products</h1>
      {loading ? (
        <h2>Loading ......</h2>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} xl={3} lg={4}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomePage;
