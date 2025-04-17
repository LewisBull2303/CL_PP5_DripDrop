import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/LogInSignupForm.module.css";
import appStyles from "../../App.module.css";
import { Alert, Form, Button, Col, Row, Container } from "react-bootstrap";
import axios from "axios";
import { useSetCurrentUser, useCurrentUser } from "../../contexts/CurrentUserContext";
import { setTokenTimestamp } from "../../utils/utils";

function LogInForm() {
  const setCurrentUser = useSetCurrentUser();
  const { currentUser } = useCurrentUser() || {}; // Fallback to empty object if context is null
  const navigate = useNavigate();

  const [logInData, setLogInData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = logInData;
  const [errors, setErrors] = useState({});

  // UseEffect to handle navigation once user is logged in
  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]); // Dependencies: re-run effect when currentUser changes

  const handleChange = (e) => {
    setLogInData({
      ...logInData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/dj-rest-auth/login/", logInData, {
        withCredentials: true,  // Ensure cookies are sent with the request
      });
      setCurrentUser(data.user); // Update the global user state
      setTokenTimestamp(data);   // Store token timestamps or perform any other logic
    } catch (err) {
      setErrors(err.response?.data || {});
    }
  };

  // Helper to safely render field-specific errors
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

  return (
    <Row className="text-center">
      <Col className="my-auto offset-md-2" md={8}>
        <Container className={`${appStyles.Content} p-4 `}>
          <h1 className="mb-4">Log in</h1>

          {/* Login form with alert messages for any errors in input fields */}
          <Form onSubmit={handleSubmit}>
            {renderFieldErrors("username")}

            <Form.Group controlId="username">
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

            {renderFieldErrors("password")}

            <Form.Group controlId="password">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control
                className={`${appStyles.Input} text-center`}
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleChange}
              />
            </Form.Group>

            {renderFieldErrors("non_field_errors")}

            <Button
              className={`my-3 ${appStyles.button}`}
              type="submit"
              onMouseDown={(e) => e.preventDefault()}
            >
              Log in!
            </Button>

            <Link className={styles.Link} to="/signup">
              Don&lsquo;t have an account? Click <span>here </span>to sign up.
            </Link>
          </Form>
        </Container>
      </Col>
    </Row>
  );
}

export default LogInForm;
