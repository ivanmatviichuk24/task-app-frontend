import React from "react";
import "./index.css";
import { Form, Col } from "react-bootstrap";

const AddTask = props => {
  return (
    <tr>
      <td></td>
      <td>
        <Form.Control />
      </td>
      <td>
        <Form.Control />
      </td>
      <td className="actions">
        <i className="fas fa-plus icon" />
      </td>
    </tr>
  );
};

export default AddTask;
