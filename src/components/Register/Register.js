import React from "react";
import { Form, Button, Alert } from "react-bootstrap";
import withTodoService from "../helper-components/withTodoService.js";
import { useHistory, useLocation } from "react-router-dom";

import { connect } from "react-redux";
import {
  loginFormEmailChange,
  loginFormPasswordChange
} from "../../redux/actions/loginForm.js";
import { fetchUser, fetchUserError } from "../../redux/actions/user.js";

const Login = props => {
  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/tasks" } };
  let register = async () => {
    try {
      const res = await props.todoService.createUser({
        email: props.loginForm.email,
        password: props.loginForm.password
      });
      const body = await res.json();
      console.log(body);
      localStorage.setItem("userToken", body.token);
      console.log(localStorage.getItem("userToken"));
      props.fetchUser(res.user);

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

  return (
    <div className="login-form">
      {errorMessage}
      <Form>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Name</Form.Label>
          <Form.Control
            placeholder="name"
            /*  defaultValue={props.loginForm.password}
            onChange={e => props.passwordChange(e.target.value)}*/
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Age</Form.Label>
          <Form.Control
            placeholder="age"
            /*  defaultValue={props.loginForm.password}
            onChange={e => props.passwordChange(e.target.value)}*/
          />
        </Form.Group>
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

        <Button variant="primary" onClick={register}>
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
