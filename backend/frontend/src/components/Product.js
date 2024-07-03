import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";

export default function Product({ product }) {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} />
      </Link>
      <Card.Title as="div">
        <Link to={`/product/${product._id}`}>
          <strong>{product?.name}</strong>
        </Link>
      </Card.Title>

      <Card.Text as="div">
        <Rating
          value={product.rating}
          text={`${product.numReviews} reviews`}
          color={`#f8e825`}
        />
      </Card.Text>
      <Card.Text as="h3">${product.price}</Card.Text>
    </Card>
  );
}
