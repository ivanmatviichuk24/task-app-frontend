import React, { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import withTodoService from "./helper-components/withTodoService.js";
import { useHistory, useLocation } from "react-router-dom";

import { connect } from "react-redux";
import { fetchUser, fetchUserError } from "../redux/actions/user.js";

const AuthLoading = props => {
  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/tasks" } };
  useEffect(() => {
    const loadUser = async () => {
      try {
        if (!localStorage.getItem("userToken")) {
          history.replace("/login");
          return;
        }
        const res = await props.todoService.getProfile();
        props.fetchUser(res);
        props.todoService.connectSocket(res.email);
        history.replace(from);
      } catch (e) {
        props.fetchUserError();
        history.replace("/login");
      }
    };
    loadUser();
  });

  return <Spinner animation="grow" />;
};

const mapStateToProps = ({ user, loginForm }) => {
  return {
    user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUser: user => dispatch(fetchUser(user)),
    fetchUserError: () => dispatch(fetchUserError)
  };
};

export default withTodoService()(
  connect(mapStateToProps, mapDispatchToProps)(AuthLoading)
);
