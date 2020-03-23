import React from "react";
import PrivateRoute from "./components/helper-components/privateRoute.js";
import fakeAuth from "./fakeAuth.js";
import Header from "./components/Header.js";
import Login from "./components/Login.js";
import TaskList from "./components/TaskList/TaskList.js";

import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from "react-router-dom";

export default function AuthExample() {
  return (
    <Router>
      <div>
        <AuthButton />
        <Header />
        <Switch>
          <PrivateRoute path="/" exact>
            <TaskList />
          </PrivateRoute>
          <Route path="/public">
            <PublicPage />
          </Route>
          <Route path="/login">
            <Login fakeAuth={fakeAuth} />
          </Route>
          <PrivateRoute path="/protected">
            <ProtectedPage />
          </PrivateRoute>
        </Switch>
      </div>
    </Router>
  );
}

function AuthButton() {
  let history = useHistory();

  return fakeAuth.isAuthenticated ? (
    <p>
      Welcome!{" "}
      <button
        onClick={() => {
          fakeAuth.signout(() => history.push("/login"));
        }}
      >
        Sign out
      </button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  );
}

function PublicPage() {
  return <h3>Public</h3>;
}

function ProtectedPage() {
  return <h3>Protected</h3>;
}
