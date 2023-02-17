import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

// Component
import Message from "../components/Message";
import Loader from "../components/Loader";
import SmallLoader from "../components/SmallLoader";
import FormContainer from "../components/FormContainer";

// Redux Thunk
import { createProduct, resetCreateProduct } from "../slices/productsSlice";

const CreateProductPage = () => {
  const [name, setName] = useState(""),
    [price, setPrice] = useState(0),
    [image, setImage] = useState(""),
    [brand, setBrand] = useState(""),
    [category, setCategory] = useState(""),
    [countInStock, setCountInStock] = useState(0),
    [description, setDescription] = useState("");

  const dispatch = useDispatch(),
    navigate = useNavigate();

  const { createLoading, createError, createSuccess } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (createSuccess) {
      dispatch(resetCreateProduct());
      navigate("/admin/productslist");
    }
  }, [createSuccess, navigate, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    const product = {
      product_name: name,
      product_price: price,
      product_image: image,
      product_brand: brand,
      product_category: category,
      product_stock_count: countInStock,
      product_description: description,
    };

    dispatch(createProduct(product));
  };

  return (
    <>
      <Link to="/admin/productslist" className="btn btn-light my-3">
        Go Back
      </Link>
      {createError && <Message>{createError}</Message>}
      {/* <FormContainer> */}
      <h1>Create Product</h1>
      <Form onSubmit={submitHandler}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="product_name" className="mb-4">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="product_description" className="mb-4">
              <Form.Label>Product Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter product description"
                row={10}
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="product_price" className="mb-4">
              <Form.Label>Product Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter product price"
                value={price}
                required
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="product_image" className="mb-4">
              <Form.Label>Product Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product image"
                value={image}
                required
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="product_brand" className="mb-4">
              <Form.Label>Product Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product brand"
                value={brand}
                required
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="product_category" className="mb-4">
              <Form.Label>Product Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product category"
                value={category}
                required
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="product_stock" className="mb-4">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter product number"
                value={countInStock}
                required
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Button type="submit" variant="primary">
          {createLoading ? <SmallLoader /> : "Create Product"}
        </Button>
      </Form>
      {/* </FormContainer> */}
    </>
  );
};

export default CreateProductPage;
