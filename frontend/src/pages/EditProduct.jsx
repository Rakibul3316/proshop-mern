import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

// Component
import Message from "../components/Message";
import SmallLoader from "../components/SmallLoader";

// Redux Thunk
import {
  resetUpdateProduct,
  savePhotoToDatabase,
  updateProduct,
} from "../slices/productsSlice";
import { fetchProduct } from "../slices/productDetailsSlice";
import { deletePhoto, uploadPhoto } from "../slices/imageSlice";

function EditProduct() {
  const [name, setName] = useState(""),
    [price, setPrice] = useState(0),
    [brand, setBrand] = useState(""),
    [category, setCategory] = useState(""),
    [countInStock, setCountInStock] = useState(0),
    [description, setDescription] = useState(""),
    [image, setImage] = useState({});

  const dispatch = useDispatch(),
    navigate = useNavigate(),
    { id } = useParams();

  const { updateLoading, updateError, updateSuccess, deleteProductImgSuccess } =
    useSelector((state) => state.products);

  const { uploadImgLoading, uploadImgError, uploadedImage, uploadedSuccess } =
    useSelector((state) => state.image);

  const { product } = useSelector((state) => state.product);

  useEffect(() => {
    if (!product.product_name || product._id !== id) {
      dispatch(fetchProduct(id));
    } else {
      setName(product.product_name);
      setPrice(product.product_price);
      setBrand(product.product_brand);
      setCategory(product.product_category);
      setCountInStock(product.product_stock_count);
      setDescription(product.product_description);
      setImage(product.product_image);
    }
    // Empty product image
    if (deleteProductImgSuccess) {
      setImage({
        image_url: "",
        public_id: "",
      });
    }
    if (uploadedSuccess) {
      setImage({
        image_url: uploadedImage.url,
        public_id: uploadedImage.public_id,
      });
      let payload = {
        _id: product._id,
        image_url: image.image_url,
        public_id: image.public_id,
      };
      dispatch(savePhotoToDatabase(payload));
    }
    if (updateSuccess) {
      navigate("/admin/productslist");
      dispatch(resetUpdateProduct());
    }
  }, [
    dispatch,
    id,
    product._id,
    product.product_name,
    product.product_brand,
    product.product_category,
    product.product_description,
    product.product_price,
    product.product_stock_count,
    product.product_image,
    deleteProductImgSuccess,
    uploadedSuccess,
    uploadedImage.url,
    uploadedImage.public_id,
    image.image_url,
    image.public_id,
    updateSuccess,
    navigate,
  ]);

  const uploadFileHandler = async (e) => {
    if (Object.keys(product.product_image).length > 0) {
      let payload = {
        _id: product._id,
        public_id: product.product_image.public_id,
      };
      // delete photo from cloudinary
      dispatch(deletePhoto(payload));

      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);

      dispatch(uploadPhoto({ formData }));
    }
  };

  const removePreview = async (e) => {
    let payload = {
      _id: product._id,
      public_id: image.public_id,
    };
    dispatch(savePhotoToDatabase(payload));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const updatedProduct = {
      _id: product._id,
      product_name: name,
      product_price: price,
      product_image: {
        image_url: image.image_url,
        public_id: image.public_id,
      },
      product_brand: brand,
      product_category: category,
      product_stock_count: countInStock,
      product_description: description,
    };
    dispatch(updateProduct(updatedProduct));
  };

  return (
    <>
      <Link to="/admin/productslist" className="btn btn-light my-3">
        Go Back
      </Link>
      {updateError && <Message variant="danger">{updateError}</Message>}
      {/* <FormContainer> */}
      <h1>Edit Product</h1>
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
                onChange={uploadFileHandler}
              ></Form.Control>
            </Form.Group>
            {uploadImgLoading && <SmallLoader />}
            {uploadImgError && <Message>{uploadImgError}</Message>}
            {image.image_url !== "" ? (
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
                  src={image.image_url}
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
          {updateLoading ? <SmallLoader /> : "Edit Product"}
        </Button>
      </Form>
    </>
  );
}

export default EditProduct;
