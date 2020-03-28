import React from "react";

import { useParams } from "react-router-dom";

import TaskList from "../TaskList/TaskList.js";
import EditTask from "../EditTask/EditTask.js";
const EditTaskPage = props => {
  return (
    <div>
      <EditTask />
      <TaskList />
    </div>
  );
};

export default EditTaskPage;
