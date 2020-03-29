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

const store = createStore(reducer);

export default store;
