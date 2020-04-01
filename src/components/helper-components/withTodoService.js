import React from "react";
import { Consumer } from "./TodoContext";

const withTodoService = () => Wrapped => {
  return props => {
    return (
      <Consumer>
        {todoService => {
          return <Wrapped {...props} todoService={todoService} />;
        }}
      </Consumer>
    );
  };
};

export default withTodoService;
