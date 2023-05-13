import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// Redux Actions
import { userList, userDelete } from "../slices/adminUserSlice.js";

// Component
import Message from "../components/Message";
import Loader from "../components/Loader";

const UsersList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const admin = useSelector((state) => state.userLogIn);
  const { userInfo } = admin;

  const allUsers = useSelector((state) => state.usersForAdmin);
  const { loading, error, users, success: successDelete } = allUsers;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(userList());
    } else {
      navigate("/login");
    }
  }, [dispatch, userInfo, navigate, successDelete]);

  const deleteHandler = (_id) => {
    if (window.confirm("Are you sure ?")) {
      dispatch(userDelete({ id: _id }));
    }
  };

  return (
    <>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto: ${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="darger"
                    className="btn-sm"
                    style={{ backgroundColor: "red" }}
                    onClick={() => deleteHandler(user._id)}
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

export default UsersList;
