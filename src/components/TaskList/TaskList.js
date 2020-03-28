import React from "react";
import { Table, Tabs, Tab } from "react-bootstrap";
import withTodoService from "../helper-components/withTodoService";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchTaskList,
  fetchTaskListError,
  taskListShowAll,
  taskListShowCompleted,
  taskListShowWorking,
  taskListFilter
} from "../../redux/actions/taskList.js";
import "./index.css";

import TaskFilter from "../helper-components/taskFilter.js";

class Tasks extends React.Component {
  async componentDidMount() {
    const res = await this.props.todoService.loadTasks();
    const body = await res.json();
    this.props.fetchTaskList(body);
    this.props.filter();
  }

  render() {
    return (
      <>
        <div className="btn-group">
          <button
            key="all"
            type="button"
            onClick={() => this.props.filterAll()}
          >
            all
          </button>
          <button
            key="button"
            type="button"
            onClick={() => this.props.filterCompleted()}
          >
            completed
          </button>
          <button
            key="active"
            type="button"
            onClick={() => this.props.filterWorking()}
          >
            active
          </button>
        </div>
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
            {this.props.taskList.filteredList.map((elem, idx) => {
              const completed = !elem.completed ? (
                <i className="fas fa-check submit-icon icon" />
              ) : (
                ""
              );
              return (
                <tr key={idx + 1}>
                  <td>{idx + 1}</td>
                  <td>{elem.title}</td>
                  <td>{elem.description}</td>
                  <td className="actions">
                    {completed}
                    <i className="fas fa-trash delete-icon icon" />
                    <Link to={`/tasks/edit/${elem._id}`}>
                      <i className="fas fa-edit edit-icon icon" />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </>
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
    fetchTaskList: list => dispatch(fetchTaskList(list)),
    filter: taskList => dispatch(taskListFilter(taskList)),
    filterAll: taskList => taskListShowAll(dispatch, taskList),
    filterCompleted: taskList => taskListShowCompleted(dispatch, taskList),
    filterWorking: taskList => taskListShowWorking(dispatch, taskList)
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { taskList } = stateProps;
  const { dispatch } = dispatchProps;

  return {
    ...ownProps,
    ...stateProps,
    fetchTaskList: list => fetchTaskList(dispatch, list, taskList.filter),
    filter: () => dispatch(taskListFilter(taskList)),
    filterAll: () => taskListShowAll(dispatch, taskList),
    filterCompleted: () => taskListShowCompleted(dispatch, taskList),
    filterWorking: () => taskListShowWorking(dispatch, taskList)
  };
};

export default withTodoService()(
  connect(mapStateToProps, null, mergeProps)(Tasks)
);
