import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Row,
  Col,
  Alert,
  Pagination,
  Form,
  InputGroup,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { fetchProducts, deleteProduct } from "../features/slice/ProductSlice";

const ProductListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading, error, totalPage } = useSelector(
    (state) => state.products
  );

  const { keyword } = useParams();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    dispatch(fetchProducts({ keyword, page }));
  }, [dispatch, keyword, page]);

  const handleAdd = () => {
    navigate("/admin/product/add");
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id)).then(() => dispatch(fetchProducts()));
    }
  };

  const handlePageChange = (newPage) => {
    if (keyword) {
      navigate(`/admin/products/search/${keyword}?page=${newPage}`);
    } else {
      navigate(`/admin/products/?page=${newPage}`);
    }
  };

  const pageNumbersToShow = 3;
  const startPage = Math.max(page - pageNumbersToShow, 1);
  const endPage = Math.min(page + pageNumbersToShow, totalPage);

  const [goToPage, setGoToPage] = useState(page);
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
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="d-flex justify-content-end">
          <Button className="rounded btn-primary" onClick={handleAdd}>
            <i className="fas fa-plus"></i> Add Product
          </Button>
        </Col>
      </Row>
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
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
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => handleDelete(product._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <div className="d-flex flex-column align-items-center mt-4">
      <Pagination className="mt-4">
          <Pagination.Prev
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          />
          {startPage > 1 && <Pagination.Item onClick={() => handlePageChange(1)}>1</Pagination.Item>}
          {startPage > 2 && <Pagination.Ellipsis />}
          {[...Array(endPage - startPage + 1).keys()].map((x) => (
            <Pagination.Item
              key={startPage + x}
              active={startPage + x === page}
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
            disabled={page === totalPage}
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
};

export default ProductListScreen;
