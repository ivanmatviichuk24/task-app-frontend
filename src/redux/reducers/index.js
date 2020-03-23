import { combineReducers } from "redux";
import userReducer from "./user.js";
import loginFormReducer from "./loginForm.js";
const rootReducer = combineReducers({
  user: userReducer,
  loginForm: loginFormReducer
});

export default rootReducer;
