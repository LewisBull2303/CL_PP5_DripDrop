import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import appStyles from "../../main.styles.css";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
import { useRedirect } from "../../hooks/useRedirect";
import { setTokenTimestamp } from "../../utils/utils";

function LogInForm() {
    const setCurrentUser = useSetCurrentUser();
    useRedirect("loggedIn");
  
    const [logInData, setLogInData] = useState({
      username: "",
      password: "",
    });

    const { username, password } = logInData;
    const [errors, setErrors] = useState({});
    const history = useHistory();

    /* 
    Handles changes to any of the input fields
    */
  const handleChange = (e) => {
    setLogInData({
      ...logInData,
      [e.target.name]: e.target.value,
    });
  };

  /* 
    Handles submitted in the form data on logging in
    Redirect user to home page
  */
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const { data } = await axios.post("/dj-rest-auth/login/", logInData);
          setCurrentUser(data.user);
          setTokenTimestamp(data);
          history.push("/");
        } catch (err) {
          setErrors(err.response?.data);
        }
      };
}