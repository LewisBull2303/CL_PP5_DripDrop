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
}