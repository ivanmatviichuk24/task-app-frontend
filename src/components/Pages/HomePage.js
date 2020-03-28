import React from "react";

import AddTask from "../TaskForm/TaskForm.js";
import TaskList from "../TaskList/TaskList.js";

const HomePage = () => {
  return (
    <>
      <AddTask />
      <TaskList />
    </>
  );
};

export default HomePage;
