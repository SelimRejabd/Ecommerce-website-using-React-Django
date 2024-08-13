import React from "react";
import { Navbar, Nav, Container, NavDropdown, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import SearchBox from "./SearchBox";
import { logout } from "../features/slice/UserLoginSlice";
import { useNavigate } from "react-router-dom";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header>
      <Navbar
        expand="lg"
        variant="dark"
        collapseOnSelect
        className="bg-dark text-white"
      >
        <Container>
          <Row className="w-100">
            <Col xs={4} className="d-flex align-items-center">
              <LinkContainer to="/">
                <Navbar.Brand>TopShop</Navbar.Brand>
              </LinkContainer>
            </Col>
            <Col xs={4} className="d-flex justify-content-center">
              <SearchBox />
            </Col>
            <Col xs={4}>
              <Nav className="ms-auto d-flex justify-content-end align-items-center">
                <LinkContainer to="/cart">
                  <Nav.Link>
                    <i className="fas fa-shopping-cart"></i> Cart
                  </Nav.Link>
                </LinkContainer>
                {user ? (
                  <NavDropdown title={user.username} id="username">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={handleLogout}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <i className="fas fa-user"></i> Login
                    </Nav.Link>
                  </LinkContainer>
                )}

                {user != null && user.isAdmin && (
                  <NavDropdown title="Admin" id="adminmenu">
                    <LinkContainer to="/admin/users">
                      <NavDropdown.Item>Users</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/products">
                      <NavDropdown.Item>Products</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/orders">
                      <NavDropdown.Item>Orders</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                )}
              </Nav>
            </Col>
          </Row>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
