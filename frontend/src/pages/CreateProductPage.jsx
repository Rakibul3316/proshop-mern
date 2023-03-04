import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

// Component
import Message from "../components/Message";
import SmallLoader from "../components/SmallLoader";
import { deletePhoto, uploadPhoto } from "../slices/imageSlice";

// Redux Thunk
import { createProduct, resetCreateProduct } from "../slices/productsSlice";

const CreateProductPage = () => {
  const [name, setName] = useState(""),
    [price, setPrice] = useState(0),
    [brand, setBrand] = useState(""),
    [category, setCategory] = useState(""),
    [countInStock, setCountInStock] = useState(0),
    [description, setDescription] = useState("");

  const dispatch = useDispatch(),
    navigate = useNavigate();

  const { createLoading, createError, createSuccess } = useSelector(
    (state) => state.products
  );

  const {
    uploadImgLoading,
    deleteImgLoading,
    uploadImgError,
    deleteImgError,
    uploadedImage,
    deletedImage,
  } = useSelector((state) => state.image);

  const handleDeleteImgByPageReload = useCallback(async () => {
    let publicId = {
      public_id: uploadedImage.public_id,
    };
    dispatch(deletePhoto(publicId));
  }, [dispatch, uploadedImage.public_id]);

  useEffect(() => {
    if (uploadedImage !== "") {
      // When click the reload button the fuction "handleDeleteImgByPageReload" will run.
      window.addEventListener("beforeunload", handleDeleteImgByPageReload);
    }

    if (createSuccess) {
      dispatch(resetCreateProduct());
      navigate("/admin/productslist");
    }

    return () => {
      // When the page reload properly romove the "handleDeleteImgByPageReload" function.
      window.removeEventListener("beforeunload", handleDeleteImgByPageReload);
    };
  }, [
    createSuccess,
    navigate,
    dispatch,
    uploadedImage,
    handleDeleteImgByPageReload,
  ]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    dispatch(uploadPhoto({ formData }));
  };

  const removePreview = async (e) => {
    let publicId = {
      public_id: uploadedImage.public_id,
    };
    dispatch(deletePhoto(publicId));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const product = {
      product_name: name,
      product_price: price,
      image_url: uploadedImage.url,
      public_id: uploadedImage.public_id,
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
                //required
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
                //required
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
                //required
                onChange={(e) => setPrice(e.target.value)}
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
                //required
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
                //required
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
                //required
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="product_image" className="mb-4">
              <Form.Label>Product Image</Form.Label>
              <Form.Control
                type="file"
                required
                onChange={uploadFileHandler}
              ></Form.Control>
            </Form.Group>
            {uploadImgLoading && <SmallLoader />}
            {uploadImgError && <Message>{uploadImgError}</Message>}
            {uploadedImage.url ? (
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  marginBottom: "20px",
                  position: "relative",
                }}
              >
                <img
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  src={uploadedImage.url}
                  alt="Thumb"
                />
                <div
                  onClick={removePreview}
                  style={{
                    position: "absolute",
                    top: "-6px",
                    right: "-6px",
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    backgroundColor: "#55595c",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <i
                    className="fa-solid fa-xmark"
                    style={{ color: "#fff" }}
                  ></i>
                </div>
              </div>
            ) : (
              <p style={{ fontSize: "16px", color: "red", fontWeight: 700 }}>
                No Image Found
              </p>
            )}
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
