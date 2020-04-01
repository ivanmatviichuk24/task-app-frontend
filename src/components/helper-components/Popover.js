import React, { useState } from "react";
import { Form, Button, Modal, Alert } from "react-bootstrap";
import withTodoService from "./withTodoService";
const Example = props => {
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const handleClose = () => {
    setShow(false);
    setError(false);
  };
  const handleShow = () => setShow(true);
  const errorMessage = error ? <Alert variant="danger">Error</Alert> : "";
  return (
    <>
      <i className="fas fa-share-square icon" onClick={handleShow} />

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Share</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorMessage}
          <Form.Control
            placeholder="Description"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={async () => {
              const res = await props.todoService.share({
                task: {
                  title: props.task.title,
                  description: props.task.description
                },
                email: email
              });
              if (res.ok) {
                setEmail("");
                setError(false);
                handleClose();
              } else {
                setError(true);
              }
            }}
          >
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default withTodoService()(Example);
