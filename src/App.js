import React from "react";
import PrivateRoute from "./components/helper-components/privateRoute.js";
import TodoService from "./services/todoServiceMock.js";
import Header from "./components/Header/Header.js";
import Login from "./components/Login.js";
import TaskList from "./components/TaskList/TaskList.js";

import { Provider as TodoServiceProvider } from "./components/helper-components/TodoContext.js";
import { Provider as StoreProvider } from "react-redux";
import store from "./redux/index.js";

import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from "react-router-dom";

const todoService = new TodoService();

export default function AuthExample() {
  return (
    <TodoServiceProvider value={todoService}>
      <StoreProvider store={store}>
        <Router>
          <div>
            <Header />
            <Switch>
              <PrivateRoute path="/" exact>
                <div>
                  <TaskList />
                </div>
              </PrivateRoute>
              <Route path="/public">
                <PublicPage />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <PrivateRoute path="/protected">
                <ProtectedPage />
              </PrivateRoute>
            </Switch>
          </div>
        </Router>
      </StoreProvider>
    </TodoServiceProvider>
  );
}

/*function AuthButton() {
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
*/
function PublicPage() {
  return <h3>Public</h3>;
}

function ProtectedPage() {
  return <h3>Protected</h3>;
}
