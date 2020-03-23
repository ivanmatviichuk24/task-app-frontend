import React from "react";
import withTodoService from "./withTodoService.js";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
function PrivateRoute({ children, ...rest }) {
  console.log(rest);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        rest.user.isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

const mapStateToProps = ({ user }) => {
  return {
    user
  };
};

export default withTodoService()(connect(mapStateToProps)(PrivateRoute));
