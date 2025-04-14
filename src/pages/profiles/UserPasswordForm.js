import React, { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import appStyles from "../../App.module.css";
import PasswordCriteria from "../../components/PasswordCriteria";
import FeedbackMsg from "../../components/FeedbackMsg";

const UserPasswordForm = () => {
    const history = useHistory();
    const { id } = useParams();
    const currentUser = useCurrentUser();
  
    const [userData, setUserData] = useState({
      new_password1: "",
      new_password2: "",
    });
    const { new_password1, new_password2 } = userData;
    const [errors, setErrors] = useState({});
    const [showAlert, setShowAlert] = useState(false);

    /* 
    Handles changes to the input fields
    */
  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

   /*
    Handles the edit of user password
  */
    useEffect(() => {
        if (currentUser?.profile_id?.toString() !== id) {
          history.push("/");
        }
      }, [currentUser, history, id]);
    
    /* 
    Handles the new password submission
    Displays a feedback message to the user on successful password change
    Redirects the user to the profile page after a short delay
    */
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.post("/dj-rest-auth/password/change/", userData);
      setShowAlert(true);
      setTimeout(function () {
        history.goBack();
      }, 2500);
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <Row>
        <Col className="py-2 mx-auto text-center font-weight-bold" md={8}>
        {showAlert && (
          <FeedbackMsg
            variant="info"
            message="Password has been changed. Taking you back to your profile's page..."
          />
        )}
        
        </Col>
    </Row>
  )
}

