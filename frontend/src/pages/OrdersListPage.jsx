import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// Redux Actions
import { getOrders } from "../slices/orderSlice";

// Component
import Message from "../components/Message";
import Loader from "../components/Loader";

function OrdersListPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const admin = useSelector((state) => state.userLogIn);
  const { userInfo } = admin;

  const { allOrdersLoading, allOrders, allOrdersError, allOrdersSuccess } =
    useSelector((state) => state.order);

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getOrders());
    } else {
      navigate("/login");
    }
  }, [dispatch, userInfo, navigate]);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h1>Order Lists</h1>
      </div>
      {allOrdersLoading ? (
        <Loader />
      ) : allOrdersError ? (
        <Message variant="danger">{allOrdersError}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER NAME</th>
              <th>DATE</th>
              <th>TOTAL PRICE</th>
              <th>PAID</th>
              <th>DELIVER</th>
            </tr>
          </thead>
          <tbody>
            {allOrders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user_id.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.items_price}</td>
                <td>
                  {order.isPaid ? (
                    order.paid_at.substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.delivered_at.substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/order/${order._id}`}>
                    <Button variant="light" className="btn-sm">
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}

export default OrdersListPage;
