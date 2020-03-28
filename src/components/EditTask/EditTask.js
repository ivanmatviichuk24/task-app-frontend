import React from "react";
import { Form, Col, Button } from "react-bootstrap";
import { connect } from "react-redux";
import withTodoService from "../helper-components/withTodoService.js";
import {
  taskFormTitleChange,
  taskFormDescriptionChange,
  taskFormSubmit
} from "../../redux/actions/taskForm";

import { Link } from "react-router-dom";

import { fetchTaskList } from "../../redux/actions/taskList";

class EditTask extends React.Component {
  async componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      const _id = this.props.match.params.id;
      const task = await this.props.todoService.loadTask(_id);
      this.props.titleChange(task.title);
      this.props.descriptionChange(task.description);
    }
  }
  async componentDidMount() {
    const _id = this.props.match.params.id;
    const task = await this.props.todoService.loadTask(_id);
    this.props.titleChange(task.title);
    this.props.descriptionChange(task.description);
  }
  render() {
    const { props } = this;
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
                this.props.descriptionChange(e.target.value);
              }}
            />
          </Form.Group>
          <Link to="/tasks">
            <Button
              className="add-task-form-elem"
              variant="primary"
              onClick={async () => {
                const updated = await this.props.todoService.updateTask({
                  _id: this.props.match.params.id,
                  title: props.taskForm.title,
                  description: props.taskForm.description
                });
                console.log(updated);
                props.clearForm();
                const tasks = await props.todoService.loadTasks();
                props.fetchTaskList(tasks);
              }}
            >
              <i className="fas fa-plus icon" />
              Edit
            </Button>
            <Button
              className="add-task-form-elem"
              variant="primary"
              onClick={() => {
                this.props.clearForm();
              }}
            >
              <i className="fas fa-plus icon" />
              Cancel
            </Button>
          </Link>
        </Form>
      </div>
    );
  }
}
const mapStateToProps = ({ taskForm }) => {
  return {
    taskForm
  };
};

const mapDispatchToProps = dispatch => {
  return {
    titleChange: value => dispatch(taskFormTitleChange(value)),
    descriptionChange: value => dispatch(taskFormDescriptionChange(value)),
    clearForm: () => taskFormSubmit(dispatch),
    fetchTaskList: list => fetchTaskList(dispatch, list)
  };
};

export default withTodoService()(
  connect(mapStateToProps, mapDispatchToProps)(EditTask)
);
