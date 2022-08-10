import React, { useRef } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";


const LoginContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #254da3;
`;

const FormContainer = styled.div`
  width: 500px;
  height: 300px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: white;
`;
const LoginButton = styled(Button)`
  margin: 10px 10px 10px 0px;
  border: none;
  background-color: #d24662;
  &:focus {
        background-color: #d24662;
    }
    &:hover {
        background-color: #fa355c;
    }
`;

const StyledTitle = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 35px;
  margin-top: -25px;
  margin-bottom: 20px;
`;
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
    <>
      <LoginContainer>
        <FormContainer>
          <StyledTitle>Messaged!</StyledTitle>
          <Form onSubmit={handleSubmit} className="w-100">
            <Form.Group>
              <Form.Label>Enter Your User ID</Form.Label>
              <Form.Control type="text" ref={idInputRef} required />
            </Form.Group>
            <LoginButton type="submit">
              Login
            </LoginButton>
            <Button variant="secondary" onClick={onCreateNewId}>
              Create a New ID
            </Button>
          </Form>
        </FormContainer>
      </LoginContainer>
    </>
  );
};

export default Login;
