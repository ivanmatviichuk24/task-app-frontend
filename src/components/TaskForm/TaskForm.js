import React from "react";
import "./index.css";
import { Form, Col, Button } from "react-bootstrap";
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
    <div className="add-task-form-container">
      <Form className="add-task-form">
        <Form.Group className="add-task-form-elem">
          <Form.Label>Title</Form.Label>
          <Form.Control
            placeholder="title"
            value={props.taskForm.title}
            onChange={e => props.titleChange(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="add-task-form-elem">
          <Form.Label>Description</Form.Label>
          <Form.Control
            placeholder="Description"
            value={props.taskForm.description}
            onChange={e => {
              props.descriptionChange(e.target.value);
            }}
          />
        </Form.Group>
        <Button
          className="add-task-form-elem"
          variant="primary"
          onClick={async () => {
            await props.todoService.addTask({
              title: props.taskForm.title,
              description: props.taskForm.description
            });
            props.submit();
            const tasks = await props.todoService.loadTasks();
            props.fetchTaskList(tasks);
          }}
        >
          <i className="fas fa-plus icon" />
          Add
        </Button>
      </Form>
    </div>
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
