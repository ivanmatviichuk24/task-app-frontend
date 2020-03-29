import React, { useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import withTodoService from "../helper-components/withTodoService.js";
import { useHistory, useLocation } from "react-router-dom";

import { connect } from "react-redux";
import {
  loginFormEmailChange,
  loginFormPasswordChange
} from "../../redux/actions/loginForm.js";
import { fetchUser, fetchUserError } from "../../redux/actions/user.js";

import "./index.css";
const Login = props => {
  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/tasks" } };
  let login = async () => {
    try {
      const res = await props.todoService.signIn(
        props.loginForm.email,
        props.loginForm.password
      );
      if (!res.ok) {
        throw new Error("error");
      }
      const body = await res.json();
      props.fetchUser(body.user);
      localStorage.setItem("userToken", body.token);

      history.replace(from);
    } catch (e) {
      props.fetchUserError();
    }
  };

  const errorMessage = props.user.error ? (
    <Alert variant="danger">Error</Alert>
  ) : (
    ""
  );
  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await props.todoService.getProfile();
        if (!res.ok) {
          throw new Error("error");
        }
        const body = await res.json();
        props.fetchUser(body);
        props.todoService.socket.emit("login", body.email);
        history.replace(from);
      } catch (e) {
        props.fetchUserError();
      }
    };
    if (localStorage.getItem("userToken")) {
      const body = loadUser();
    }
  }, []);

  return (
    <div className="login-form">
      {errorMessage}
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            defaultValue={props.loginForm.email}
            onChange={e => props.emailChange(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            defaultValue={props.loginForm.password}
            onChange={e => props.passwordChange(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" onClick={login}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

const mapStateToProps = ({ user, loginForm }) => {
  return {
    loginForm,
    user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    emailChange: value => dispatch(loginFormEmailChange(value)),
    passwordChange: value => dispatch(loginFormPasswordChange(value)),
    fetchUser: user => dispatch(fetchUser(user)),
    fetchUserError: () => dispatch(fetchUserError)
  };
};

export default withTodoService()(
  connect(mapStateToProps, mapDispatchToProps)(Login)
);
