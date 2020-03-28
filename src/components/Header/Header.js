import React from "react";
import { Navbar, Nav, Form, Button, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import withTodoService from "../helper-components/withTodoService.js";
import { connect } from "react-redux";
import { userLogout } from "../../redux/actions/user.js";
import "./index.css";

const Header = props => {
  const logout = () => {
    localStorage.setItem("userToken", "");
    props.logout();
  };
  const user = props.user.isAuthenticated ? (
    <div>
      {props.user.name}
      <i className="fas fa-sign-out-alt" onClick={logout}></i>
    </div>
  ) : (
    <Nav>
      <Nav.Link as={Link} to={"/Register"}>
        Register
      </Nav.Link>
      <Nav.Link as={Link} to={"/Login"}>
        Login
      </Nav.Link>
    </Nav>
  );
  return (
    <Navbar bg="dark" variant="dark" className="header">
      <Navbar.Brand as={Link} to="/tasks">
        TaskApp
      </Navbar.Brand>
      <Nav className="mr-auto">
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
      {user}
    </Navbar>
  );
};
const mapStateToProps = ({ user }) => {
  return {
    user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(userLogout)
  };
};

export default withTodoService()(
  connect(mapStateToProps, mapDispatchToProps)(Header)
);
