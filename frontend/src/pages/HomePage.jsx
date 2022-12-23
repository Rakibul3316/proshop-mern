import React from 'react';
import { Row, Col } from 'react-bootstrap';
// Component
import Product from '../components/Product';
import products from '../products';

const HomePage = () => {
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {
          products.map(product => (
            <Col sm={12} md={6} xl={3} lg={4}>
              <Product product={product} />
            </Col>
          ))
        }
      </Row>
    </>
  )
}

export default HomePage