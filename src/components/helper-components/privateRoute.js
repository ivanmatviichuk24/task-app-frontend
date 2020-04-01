import React from "react";
import withTodoService from "./withTodoService.js";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        rest.user.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/authloading",
              state: { from: props.location }
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
