import React from "react";
import withTodoService from "./withTodoService.js";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

/*const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = stores.auth.isAuthenticated;
  if (isAuthenticated) {
    return <Route {...rest} render={props => } />;
  }

  return <Route {...rest} render={props => <Redirect to="/Login" />} />;
};*/

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
              pathname: "/login",
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
