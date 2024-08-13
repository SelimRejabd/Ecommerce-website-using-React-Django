import React, { useEffect } from "react";
import { Carousel, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchTopProducts } from "../features/slice/ProductSlice";

const ProductCarousel = () => {
  const dispatch = useDispatch();
  const { topProducts, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchTopProducts());
  }, [dispatch]);

  return loading ? (
    <div>Loading...</div>
  ) : error ? (
    <alert variant="danger">{error}</alert>
  ) : (
    <Carousel pause="hover" className="bg-dark">
      {topProducts.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image className="carousel-image" src={product.image} alt={product.name} fluid />
            <Carousel.Caption className="carousel-caption">
              <h3 >
                {product.name} (${product.price})
              </h3>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
