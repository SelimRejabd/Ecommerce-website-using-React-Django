import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Form,
  Alert,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../features/slice/CartSlice";
import {
  fetchProductById,
  createProductReview,
  clearMessages,
} from "../features/slice/ProductSlice";

const ProductScreen = () => {
  const [qty, setQty] = useState(1);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { product, successMessage, error } = useSelector(
    (state) => state.products
  );

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (successMessage) {
      setRating(0);
      setComment("");
      dispatch(clearMessages());
    }
    dispatch(fetchProductById(id));
  }, [successMessage, dispatch, id, navigate]);

  if (!product) {
    return <div>No product found</div>;
  }

  const addToCartHandler = () => {
    dispatch(addItem({ ...product, qty }));
    navigate(`/cart/${id}?qty=${qty}`);
  };
  const handleBack = () => {
    navigate(-1);
  };

  const handleReview = (e) => {
    e.preventDefault();
    const formData = { id, rating, comment };
    dispatch(createProductReview(formData));
  };

  return (
    <div>
      <Button className="btn btn-light mb-3 " onClick={handleBack}>
        <i className="fas fa-arrow-left"></i> Go Back
      </Button>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup>
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
                color={`#f8e825`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <ListGroup>
            <ListGroup.Item>
              <Row>
                <Col>Price:</Col>
                <Col>
                  <strong>${product.price}</strong>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Status:</Col>
                <Col>
                  {product.countInStock > 0 ? "In stock" : "Out of stock"}
                </Col>
              </Row>
            </ListGroup.Item>
            {product.countInStock > 0 && (
              <ListGroup.Item>
                <Row>
                  <Col>Qty</Col>
                  <Col xs="auto" className="my-1">
                    <Form.Control
                      as="select"
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                      className="form-select"
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                </Row>
              </ListGroup.Item>
            )}

            <ListGroup.Item>
              <Button
                disabled={product.countInStock === 0}
                className="btn-black"
                type="button"
                style={{ width: "100%" }}
                onClick={addToCartHandler}
              >
                Add To Cart
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={6}>
          <h2>Reviews</h2>
          {product.reviews.length === 0 && <Alert>No Reviews</Alert>}
          <ListGroup variant="flush">
            {product.reviews.map((review) => (
              <ListGroup.Item key={review._id}>
                <strong>{review.name}</strong>
                <Rating value={review.rating} color={`#f8e825`} />
                <p>{review.createdAt.substring(0, 10)}</p>
                <p>{review.comment}</p>
              </ListGroup.Item>
            ))}
            <ListGroup.Item>
              <h2>Write a Customer Review</h2>
              {successMessage && (
                <Alert variant="success">{successMessage}</Alert>
              )}
              {error && <Alert variant="danger">{error}</Alert>}
              {user ? (
                <Form onSubmit={handleReview}>
                  <Form.Group controlId="rating">
                    <Form.Label>Rating</Form.Label>
                    <Form.Control
                      as="select"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    >
                      <option value="">Select...</option>
                      <option value="1">1 - Poor</option>
                      <option value="2">2 - Fair</option>
                      <option value="3">3 - Good</option>
                      <option value="4">4 - Very Good</option>
                      <option value="5">5 - Excellent</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="comment">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control
                      as="textarea"
                      row="3"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Button type="submit" variant="primary">
                    Submit
                  </Button>
                </Form>
              ) : (
                <div>
                  Please{" "}
                  <Link to="/login" className="color-blue">
                    Login
                  </Link>
                </div>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
};

export default ProductScreen;
