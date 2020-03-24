import React from "react";
import "./index.css";
import { Form, Col } from "react-bootstrap";
import { connect } from "react-redux";
import withTodoService from "../helper-components/withTodoService.js";
import {
  taskFormTitleChange,
  taskFormDescriptionChange,
  taskFormSubmit
} from "../../redux/actions/taskForm";

import { fetchTaskList } from "../../redux/actions/taskList";
const TaskForm = props => {
  return (
    <tr>
      <td></td>
      <td>
        <Form.Control
          value={props.taskForm.title}
          onChange={e => props.titleChange(e.target.value)}
        />
      </td>
      <td>
        <Form.Control
          value={props.taskForm.description}
          onChange={e => {
            props.descriptionChange(e.target.value);
          }}
        />
      </td>
      <td className="actions">
        <i
          className="fas fa-plus icon"
          onClick={async () => {
            await props.todoService.addTask({
              title: props.taskForm.title,
              description: props.taskForm.description
            });
            props.submit();
            const tasks = await props.todoService.loadTasks();
            props.fetchTaskList(tasks);
          }}
        />
      </td>
    </tr>
  );
};

const mapStateToProps = ({ taskForm }) => {
  return {
    taskForm
  };
};

const mapDispatchToProps = dispatch => {
  return {
    titleChange: value => dispatch(taskFormTitleChange(value)),
    descriptionChange: value => dispatch(taskFormDescriptionChange(value)),
    submit: () => taskFormSubmit(dispatch),
    fetchTaskList: list => dispatch(fetchTaskList(list))
  };
};

export default withTodoService()(
  connect(mapStateToProps, mapDispatchToProps)(TaskForm)
);
