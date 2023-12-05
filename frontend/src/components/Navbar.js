import React from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AppNavbar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/">   P&C</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav className="mr-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
          <Nav.Link as={Link} to="/" className="active">Home</Nav.Link>
          <NavDropdown title="CRUD" id="navbarScrollingDropdown">
            <NavDropdown.Item as={Link} to="/restaurants">Restaurants</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/create">Create Restaurant</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/update">Update Restaurant</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/delete">Delete Restaurant</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Form className="d-flex">
          <FormControl
            type="search"
            placeholder="Search"
            className="mr-2"
            aria-label="Search"
          />
          <Button variant="outline-success" type="submit">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppNavbar;
