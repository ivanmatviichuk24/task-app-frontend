import reducer from "./reducers/index.js";
import { createStore, applyMiddleware } from "redux";
import openSocket from "socket.io-client";
import {
  fetchTaskList,
  fetchTaskListError,
  taskListShowAll,
  taskListShowCompleted,
  taskListShowWorking,
  taskListFilter
} from "./actions/taskList.js";

import thunk from "redux-thunk";

const store = createStore(reducer, applyMiddleware(thunk));

const socket = openSocket("http://localhost:5000");

socket.on("tasks", list => {
  console.log(list);
  fetchTaskList(store.dispatch, list);
});

export default store;
