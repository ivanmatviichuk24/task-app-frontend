import React from "react";
import { Table } from "react-bootstrap";

import "./index.css";

const TaskList = [
  {
    id: 1,
    title: "create task app",
    description: "nerdysoft test app"
  }
];

const Tasks = props => {
  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {TaskList.map(elem => {
          return (
            <tr key={elem.id}>
              <td>{elem.id}</td>
              <td>{elem.title}</td>
              <td>{elem.description}</td>
              <td>
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
};

export default Tasks;
