import { combineReducers } from "redux";
import userReducer from "./user.js";
import loginFormReducer from "./loginForm.js";
import taskFormReducer from "./taskForm.js";
import taskListReducer from "./taskList.js";
const rootReducer = combineReducers({
  user: userReducer,
  loginForm: loginFormReducer,
  taskForm: taskFormReducer,
  taskList: taskListReducer
});

export default rootReducer;
