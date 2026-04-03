import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";
import "./Modal-login.css";

export function Login({ show, handleClose }) {
  const [showCreateAccount, setShowCreateAccount] = useState(false);

  const handleSwitchToCreateAccount = () => {
    setShowCreateAccount(true);
  };

  const handleSwitchToLogin = () => {
    setShowCreateAccount(false);
  };

  return (
    <>
      {!showCreateAccount ? (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>Login Account</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <div
                  className="CreateAcc"
                  style={{ cursor: "pointer", color: "yellow" }}
                  onClick={handleSwitchToCreateAccount}
                >
                  Create Account??
                </div>
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      ) : (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>Create Account</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your name" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>

              <Button variant="primary" type="submit" >
                Create Account
              </Button>
            </Form>
            <div
              className="mt-3"
              style={{ cursor: "pointer", color: "yellow" }}
              onClick={handleSwitchToLogin}
            >
              Already have an account? Login here.
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}