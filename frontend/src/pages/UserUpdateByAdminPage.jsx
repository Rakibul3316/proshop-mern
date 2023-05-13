import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

// Redux Actions
import {
  userDetails,
  userUpdate,
  resetUserDetails,
} from "../slices/adminUserSlice.js";

// Component
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";

const UserUpdateByAdminPage = () => {
  const dispatch = useDispatch(),
    navigate = useNavigate(),
    { id } = useParams();

  const [name, setName] = useState(""),
    [email, setEmail] = useState(""),
    [isAdmin, setIsAdmin] = useState(false);

  const allUsers = useSelector((state) => state.usersForAdmin);
  const { error, user, loading, updateLoading, updateError, updateSuccess } =
    allUsers;

  useEffect(() => {
    if (updateSuccess) {
      navigate("/admin/userslist");
      dispatch(resetUserDetails());
    } else {
      if (!user.name || user._id !== id) {
        dispatch(userDetails({ id }));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, id, user, navigate, updateSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();
    let user = {
      _id: id,
      name,
      email,
      isAdmin,
    };
    dispatch(userUpdate({ user }));
  };

  return (
    <>
      <Link to="/admin/userslist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {updateLoading && <Loader />}
        {updateError && <Message variant="danger">{updateError}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name" className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="isadmin" className="mb-3">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>
            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserUpdateByAdminPage;
