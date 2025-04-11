import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "../../styles/LogInSignUpForm.module.css";
import appStyles from "../../App.module.css";
import { Alert, Form, Button, Col, Row, Container } from "react-bootstrap";
import axios from "axios";
import PasswordCriteria from "../../components/PasswordCriteria";
import { useRedirect } from "../../hooks/useRedirect";

const SignUpForm = () => {
  useRedirect("loggedIn");
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });
  const { username, password1, password2 } = signUpData;
  const [errors, setErrors] = useState({});
  const history = useHistory();
}