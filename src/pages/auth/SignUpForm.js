import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/LogInSignupForm.module.css";
import appStyles from "../../App.module.css";
import { Alert, Form, Button, Col, Row, Container } from "react-bootstrap";
import axios from "axios";
import PasswordCriteria from "../../components/PasswordCriteria";
import { useRedirect } from "../../hooks/useRedirect";

const SignUpForm = () => {
  const isLoading = useRedirect("loggedIn");

  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });
  const { username, password1, password2 } = signUpData;
  const [errors, setErrors] = useState({});
  const history = useNavigate();

  const handleChange = (e) => {
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/dj-rest-auth/registration/", signUpData);
      history("/login");
    } catch (err) {
      setErrors(err.response?.data || {});
    }
  };

  // 🔧 Helper to safely render field-specific errors
  const renderFieldErrors = (field) => {
    return (
      Array.isArray(errors[field]) &&
      errors[field].map((message, idx) => (
        <Alert variant="warning" className={appStyles.Alert} key={idx}>
          {message}
        </Alert>
      ))
    );
  };

  if (isLoading) {
    return (
      <Row className="text-center">
        <Col className="my-auto offset-md-2" md={8}>
          <Container className={`${appStyles.Content} p-4`}>
            <h1>Loading...</h1>
          </Container>
        </Col>
      </Row>
    );
  }

  return (
    <Row className="text-center">
      <Col className="my-auto offset-md-2" md={8}>
        <Container className={`${appStyles.Content} p-4 `}>
          <h1 className="mb-4">Sign up</h1>

          <Form onSubmit={handleSubmit}>
            {renderFieldErrors("username")}

            <Form.Group controlId="username">
              <Form.Text id="passwordHelpBlock" muted>
                Your username must be 1-10 characters long.
              </Form.Text>
              <Form.Label className="d-none">Username</Form.Label>
              <Form.Control
                className={`${appStyles.Input} text-center`}
                type="text"
                placeholder="Your username"
                name="username"
                maxLength={10}
                value={username}
                onChange={handleChange}
              />
            </Form.Group>

            {renderFieldErrors("password1")}

            <Form.Group controlId="password1">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control
                className={`${appStyles.Input} text-center`}
                type="password"
                placeholder="Password"
                name="password1"
                value={password1}
                onChange={handleChange}
              />
            </Form.Group>

            {renderFieldErrors("password2")}

            <Form.Group controlId="password2">
              <Form.Label className="d-none">Confirm password</Form.Label>
              <Form.Control
                className={`${appStyles.Input} text-center`}
                type="password"
                placeholder="Confirm password"
                name="password2"
                value={password2}
                onChange={handleChange}
              />
            </Form.Group>

            {renderFieldErrors("non_field_errors")}

            <PasswordCriteria />

            <Button
              className={`my-3 ${appStyles.button}`}
              type="submit"
              onMouseDown={(e) => e.preventDefault()}
            >
              Sign up!
            </Button>

            <Link className={styles.Link} to="/login">
              Already a member? Click <span>here </span>to log in.
            </Link>
          </Form>
        </Container>
      </Col>
    </Row>
  );
};

export default SignUpForm;
