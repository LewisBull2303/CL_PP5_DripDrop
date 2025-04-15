import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form, InputGroup } from "react-bootstrap";
import styles from "../../styles/CommentCreateEditForm.module.css";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";

function CommentCreateForm(props) {
    const { post, setPost, setComments, profileImage, profile_id } = props;
    const [content, setContent] = useState("");
  
    /* 
      Handles changes to the create comment input field
    */
    const handleChange = (e) => {
      setContent(e.target.value);
    };
}  