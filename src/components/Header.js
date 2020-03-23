import React from "react";
import { Navbar, Nav, Form, Button, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import withTodoService from "./helper-components/withTodoService.js";

const Header = props => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand as={Link} to="/">
        TaskApp
      </Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link as={Link} to={"/Register"}>
          Register
        </Nav.Link>
        <Nav.Link as={Link} to={"/Login"}>
          Login
        </Nav.Link>
        <Nav.Link as={Link} to={"/public"}>
          Public
        </Nav.Link>
        <Nav.Link as={Link} to={"/protected"}>
          Protected
        </Nav.Link>
      </Nav>
      <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-info">Search</Button>
      </Form>
    </Navbar>
  );
};

export default withTodoService()(Header);
