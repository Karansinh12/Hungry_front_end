import React from "react";
import { useAuth } from "../Context/AuthContext";
import logoImage from './logo.png'; 
import { Navbar, Container, Nav } from 'react-bootstrap';

const Header = () => {
  const { state } = useAuth();

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">
          <img
            src={logoImage}
            alt="Hungary Hub Logo"
            className="d-inline-block align-top"
            style={{ width: "220px" }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto"> {/* Align all menu items to the right */}
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/restlist">RestaurantList</Nav.Link>
            {state.isAuthenticated && state.user.role === 'admin' && (
              <>
                <Nav.Link href="/admin/managerestaurant">Manage Restaurant</Nav.Link>
                <Nav.Link href="/admin/manageusers">Manage Users</Nav.Link>
                <Nav.Link href="/admin/managecoupons">Manage Coupons</Nav.Link>
              </>
            )}

            
            {state.isAuthenticated && state.user.role !== 'admin' && (
              <>
                <Nav.Link href="/about">About</Nav.Link>
                <Nav.Link href="/contact">Contact</Nav.Link>
                <Nav.Link href="/paypalpayment">PayPal</Nav.Link>
              </>
            )}

            {state.isAuthenticated ? (
              <>
                <Nav.Link href="/userprofile">
                  {state.user.fname + "," + state.user.lname}
                </Nav.Link>
                <Nav.Link href="/logout">Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href="/signup">Register</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
              </>
            )}

            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
