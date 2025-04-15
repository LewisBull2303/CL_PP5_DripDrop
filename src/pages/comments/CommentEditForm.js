import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { axiosRes } from "../../api/axiosDefaults";
import styles from "../../styles/CommentCreateEditForm.module.css";

function CommentEditForm(props) {
    const { id, content, setShowEditForm, setComments, setShowAlert } = props;
    const [formContent, setFormContent] = useState(content);
  
    /* 
      Handles changes to form input
    */
    const handleChange = (e) => {
      setFormContent(e.target.value);
    };
}