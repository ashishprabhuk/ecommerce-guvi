import React, { useContext, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import "./Login.css";
import { Store } from "../ContextApi/context";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const { setToken } = useContext(Store);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/login`, {
        name,
        email,
        password,
      });
      if (response.status >= 200 && response.status < 300) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        setToken(token);
        navigate("/");
      } else {
        console.log("Request failed with status:", response.status);
      }
    } catch (error) {
      console.error("Login request failed:", error);
    }
  };

  return (
    <>
      <Container fluid className="login-container mt-4 mb-5">
        <h2 className="text-center">Login</h2>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword" className="my-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          className="my-2 w-100"
          onClick={() => {
            handleLogin();
          }}
        >
          Login
        </Button>
      </Container>
      <div className="newUser">
        <Link to="/signup">New user? Sign Up</Link>
      </div>
    </>
  );
};

export default LoginPage;
