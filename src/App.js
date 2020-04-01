import React from "react";
import PrivateRoute from "./components/helper-components/privateRoute.js";
import TodoService from "./services/todoService.js";
import Header from "./components/Header/Header.js";
import Footer from "./components/Footer/Footer.js";
import Login from "./components/Login/Login.js";
import AuthLoading from "./components/AuthLoading.js";
import TaskList from "./components/TaskList/TaskList.js";
import TaskForm from "./components/TaskForm/TaskForm.js";
import EditTask from "./components/EditTask/EditTask.js";
import Register from "./components/Register/Register.js";
import { Provider as TodoServiceProvider } from "./components/helper-components/TodoContext.js";
import { Provider as StoreProvider } from "react-redux";
import store from "./redux/index.js";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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
              <Route path="/authLoading" component={AuthLoading} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
            </Switch>
          </div>
          <Footer />
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
