// Parent Component => App
import { React, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../slices/productsSlice";

// Component
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useParams } from "react-router-dom";

const HomePage = () => {
  const dispatch = useDispatch();
  const { keyword } = useParams();
  const productsList = useSelector((state) => state.products);
  const { products, loading, error } = productsList;

  useEffect(() => {
    dispatch(fetchProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
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
