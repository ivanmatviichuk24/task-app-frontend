import React, { useState } from "react";
import { Popover, Form, Button, Modal } from "react-bootstrap";
import withTodoService from "./withTodoService";
const Example = props => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <i className="fas fa-share-square icon" onClick={handleShow} />

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Share</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
            onClick={() => {
              console.log(email);
              props.todoService.share({
                task: {
                  title: props.task.title,
                  description: props.task.description
                },
                email: email
              });
              handleClose();
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
