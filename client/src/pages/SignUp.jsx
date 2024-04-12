import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/signup`, {
        name,
        email,
        password,
      });
      if (response.status >= 200 && response.status < 300) {
        navigate("/login");
      } else {
        console.log("Request failed with status:", response.status);
      }
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <>
      <Container fluid className="login-container mt-4 mb-5">
        {" "}
        <h2 className="text-center">Sign Up</h2>
        <Form.Group controlId="formBasicFullName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          className="my-3 w-100"
          onClick={() => {
            handleSignUp();
          }}
        >
          {" "}
          Sign Up
        </Button>
      </Container>
      <div className="loggedIn">
        <Link to="/login">Already logged in? Login</Link>
      </div>
    </>
  );
};

export default SignUp;
