import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";
import {
  fetchUser,
  updateUser,
  clearSuccessMessage,
} from "../features/slice/usersListSlice";

const UserEditScreen = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.usersList.user);
  const successMessage = useSelector((state) => state.usersList.successMessage);

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    dispatch(fetchUser(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (user) {
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  const handleCheckboxChange = (e) => {
    setIsAdmin(e.target.checked);
  };

  const handleUpdateClick = () => {
    dispatch(updateUser({ id, isAdmin }));
  };

  useEffect(() => {
    if (successMessage) {
      alert(successMessage);
      dispatch(clearSuccessMessage());
    }
  }, [successMessage, dispatch]);

  const handleBack = () => {
    navigate(-1);
  }
  return (
    <div>
      <Button className="btn btn-light " onClick={handleBack}><i className="fas fa-arrow-left"></i> Go Back</Button>
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Title className="text-center">User Details</Card.Title>
                <Card.Text>
                  <strong>Name:</strong> {user.name}
                </Card.Text>
                <Card.Text>
                  <strong>Email:</strong> {user.email}
                </Card.Text>
                <Form.Group controlId="admin-checkbox">
                  <Form.Check
                    type="checkbox"
                    label="Set as Admin"
                    checked={isAdmin}
                    onChange={handleCheckboxChange}
                  />
                </Form.Group>
                <div className="text-center mt-4">
                  <Button
                    variant="primary"
                    className="rounded"
                    onClick={handleUpdateClick}
                  >
                    Update
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UserEditScreen;
