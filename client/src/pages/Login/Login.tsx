import React, { useRef } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

interface LoginProps {
  onIdSubmit: (id: string) => void;
}
const Login = (props: LoginProps) => {
  const { onIdSubmit } = props;
  const idInputRef = useRef<HTMLInputElement | null>(null);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    onIdSubmit(idInputRef?.current?.value as string);
  };

  const onCreateNewId = () => onIdSubmit(uuidv4());

  return (
    <Container
      className="align-items-center d-flex"
      style={{ height: "100vh" }}
    >
      <Form onSubmit={handleSubmit} className="w-100">
        <Form.Group>
          <Form.Label>Enter Your Id</Form.Label>
          <Form.Control type="text" ref={idInputRef} required />
        </Form.Group>
        <Button type="submit" className="mr-2">
          Login
        </Button>
        <Button variant="secondary" onClick={onCreateNewId}>
          Create a New ID
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
