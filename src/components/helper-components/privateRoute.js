import React from "react";
import withTodoService from "./withTodoService.js";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ children, ...rest }) {
  console.log(rest);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        rest.todoService.isAuthenticated ? (
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

export default withTodoService()(PrivateRoute);
