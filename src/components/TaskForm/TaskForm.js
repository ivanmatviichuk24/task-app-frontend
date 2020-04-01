import React from "react";
import "./index.css";
import { Form, Button, Alert } from "react-bootstrap";
import { connect } from "react-redux";
import withTodoService from "../helper-components/withTodoService.js";
import {
  taskFormTitleChange,
  taskFormDescriptionChange,
  taskFormSubmit,
  taskFormError
} from "../../redux/actions/taskForm";

const TaskForm = props => {
  const error = props.taskForm.error ? (
    <Alert variant="danger">Error</Alert>
  ) : (
    " "
  );
  return (
    <div className="add-task-form-container">
      {error}
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
            try {
              await props.todoService.addTask({
                title: props.taskForm.title,
                description: props.taskForm.description
              });
              props.submit();
            } catch (e) {
              props.error();
            }
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
    error: () => dispatch(taskFormError()),
    titleChange: value => dispatch(taskFormTitleChange(value)),
    descriptionChange: value => dispatch(taskFormDescriptionChange(value)),
    submit: () => taskFormSubmit(dispatch)
  };
};

export default withTodoService()(
  connect(mapStateToProps, mapDispatchToProps)(TaskForm)
);
