import React from "react";
import AddTask from "../AddTask/AddTask.js";
import { Table } from "react-bootstrap";
import withTodoService from "../helper-components/withTodoService";

import "./index.css";

class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tasks: [] };
  }
  async componentDidMount() {
    const tasks = await this.props.todoService.loadTasks();
    console.log(this.props.todoService.loadTasks);
    await this.setState({
      tasks: tasks
    });
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
          {this.state.tasks.map(elem => {
            return (
              <tr key={elem.id}>
                <td>{elem.id}</td>
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

export default withTodoService()(Tasks);
