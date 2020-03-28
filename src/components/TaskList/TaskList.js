import React from "react";
import { Table, Tabs, Tab } from "react-bootstrap";
import withTodoService from "../helper-components/withTodoService";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
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
      <>
        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
          <Tab eventKey="home" title="Home" />
          <Tab eventKey="profile" title="Profile" />
          <Tab eventKey="contact" title="Contact" />
        </Tabs>
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
            {this.props.taskList.list.map((elem, idx) => {
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
    fetchTaskList: list => dispatch(fetchTaskList(list))
  };
};

export default withTodoService()(
  connect(mapStateToProps, mapDispatchToProps)(Tasks)
);
