import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// Redux Actions
import { fetchProducts, deleteProduct } from "../slices/productsSlice.js";

// Component
import Message from "../components/Message";
import Loader from "../components/Loader";

const ProductsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const admin = useSelector((state) => state.userLogIn);
  const { userInfo } = admin;

  const allProducts = useSelector((state) => state.products);
  const { loading, products, error, success } = allProducts;
  // console.log('error >>', error);

  let keyword = '', pageNumber = '';

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(fetchProducts({ keyword, pageNumber }));
    } else {
      navigate("/login");
    }
  }, [dispatch, userInfo, navigate, success, keyword, pageNumber]);

  const deleteHandler = (product) => {
    if (window.confirm("Are you sure ?")) {
      let payload = {
        _id: product._id,
        product_image: product.product_image,
      };
      dispatch(deleteProduct(payload));
    }
  };

  const createProductHandler = () => {
    navigate("/admin/product/create");
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h1>Products</h1>
        <div>
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </div>
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>IMAGE</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>
                  <img
                    src={product.product_image.image_url}
                    alt="product"
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "cover",
                    }}
                  />
                </td>
                <td>{product.product_name}</td>
                <td>{product.product_price}</td>
                <td>{product.product_category}</td>
                <td>{product.product_brand}</td>
                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="darger"
                    className="btn-sm"
                    style={{ backgroundColor: "red" }}
                    onClick={() => deleteHandler(product)}
                  >
                    <i className="fas fa-trash" style={{ color: "white" }}></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ProductsList;
