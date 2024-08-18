import React, { useEffect, useState } from "react";
import { Row, Col, Pagination, Button, Form, InputGroup, Alert } from "react-bootstrap";
import Product from "../components/Product";
import { fetchProducts } from "../features/slice/ProductSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import ProductCarousel from "../components/ProductCarousel";

export default function HomeScreen() {
  const { products, error, totalPage } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const { keyword } = useParams();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const navigate = useNavigate();

  const [goToPage, setGoToPage] = useState(page);

  useEffect(() => {
    dispatch(fetchProducts({ keyword, page }));
  }, [dispatch, keyword, page]);

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  const handlePageChange = (newPage) => {
    if (keyword) {
      navigate(`/search/${keyword}?page=${newPage}`);
    } else {
      navigate(`/?page=${newPage}`);
    }
  };

  const pageNumbersToShow = 3;
  const startPage = Math.max(page - pageNumbersToShow, 1);
  const endPage = Math.min(page + pageNumbersToShow, totalPage);

  const handleGoToPageChange = (e) => {
    setGoToPage(e.target.value);
  };

  const handleGoToPageSubmit = (e) => {
    e.preventDefault();
    if (goToPage >= 1 && goToPage <= totalPage) {
      handlePageChange(goToPage);
    }
  };

  return (
    <div>
      {!keyword && <ProductCarousel />}
      <h1 className="mt-4">Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>

      <div className="d-flex flex-column align-items-center mt-4">
      <Pagination className="mt-4">
          <Pagination.Prev
            onClick={() => handlePageChange(Number(page) - 1)}
            disabled={Number(page) === 1}
          />
          {startPage > 1 && <Pagination.Item onClick={() => handlePageChange(1)}>1</Pagination.Item>}
          {startPage > 2 && <Pagination.Ellipsis />}
          {[...Array(endPage - startPage + 1).keys()].map((x) => (
            <Pagination.Item
              key={startPage + x}
              active={startPage + x === Number(page)}
              onClick={() => handlePageChange(startPage + x)}
            >
              {startPage + x}
            </Pagination.Item>
          ))}
          {endPage < totalPage - 1 && <Pagination.Ellipsis />}
          {endPage < totalPage && (
            <Pagination.Item onClick={() => handlePageChange(totalPage)}>
              {totalPage}
            </Pagination.Item>
          )}
          <Pagination.Next
            onClick={() => handlePageChange(Number(page) + 1)}
            disabled={Number(page) === totalPage}
          />
        </Pagination>

        <Form onSubmit={handleGoToPageSubmit} className="d-flex align-items-center">
          <InputGroup>
            <Form.Control
              type="number"
              min="1"
              max={totalPage}
              value={goToPage}
              onChange={handleGoToPageChange}
              className="custom-go-input"
              style={{ maxWidth: "80px" }}
            />
            <Button type="submit" variant="primary" className="custom-go-button">
              Go
            </Button>
          </InputGroup>
        </Form>
      </div>
    </div>
  );
}
