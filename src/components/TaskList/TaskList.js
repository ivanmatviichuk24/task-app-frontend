import React from "react";
import AddTask from "../TaskForm/TaskForm.js";
import { Table } from "react-bootstrap";
import withTodoService from "../helper-components/withTodoService";
import { connect } from "react-redux";
import {
  fetchTaskList,
  fetchTaskListError
} from "../../redux/actions/taskList.js";
import "./index.css";

class Tasks extends React.Component {
  async componentDidMount() {
    const tasks = await this.props.todoService.loadTasks();

    this.props.fetchTaskList(tasks);
  }
  render() {
    return (
      <Table striped bordered hover variant="dark" responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <AddTask />
          {this.props.taskList.list.map((elem, idx) => {
            return (
              <tr key={idx + 1}>
                <td>{idx + 1}</td>
                <td>{elem.title}</td>
                <td>{elem.description}</td>
                <td className="actions">
                  <i className="fas fa-check submit-icon icon" />
                  <i className="fas fa-trash delete-icon icon" />
                  <i className="fas fa-edit edit-icon icon" />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }
}

const mapStateToProps = ({ taskList }) => {
  return {
    taskList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTaskList: list => dispatch(fetchTaskList(list))
  };
};

export default withTodoService()(
  connect(mapStateToProps, mapDispatchToProps)(Tasks)
);
