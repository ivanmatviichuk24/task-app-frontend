import React from "react";
import PrivateRoute from "./components/helper-components/privateRoute.js";
import TodoService from "./services/todoServiceMock.js";
import Header from "./components/Header/Header.js";
import Login from "./components/Login/Login.js";

import HomePage from "./components/Pages/HomePage.js";
import EditTaskPage from "./components/Pages/EditTaskPage.js";
import TaskList from "./components/TaskList/TaskList.js";
import TaskForm from "./components/TaskForm/TaskForm.js";
import EditTask from "./components/EditTask/EditTask.js";
import { Provider as TodoServiceProvider } from "./components/helper-components/TodoContext.js";
import { Provider as StoreProvider } from "react-redux";
import store from "./redux/index.js";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
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
          <Header />
          <div className="main">
            <Switch>
              <PrivateRoute path="/tasks" component={Tasks} />

              <Route path="/public/" component={PublicPage} />
              <Route path="/login" component={Login} />
              <PrivateRoute path="/protected" component={ProtectedPage} />
            </Switch>
          </div>
        </Router>
      </StoreProvider>
    </TodoServiceProvider>
  );
}

const Tasks = () => {
  return (
    <>
      <Switch>
        <PrivateRoute path="/tasks" exact component={TaskForm} />
        <PrivateRoute path="/tasks/edit/:id" exact component={EditTask} />
      </Switch>
      <TaskList />
    </>
  );
};

class PublicPage extends React.Component {
  render() {
    console.log(this.props);
    return <h3>Public</h3>;
  }
}

class ProtectedPage extends React.Component {
  render() {
    console.log(this.props);
    return <h3>Protected</h3>;
  }
}
