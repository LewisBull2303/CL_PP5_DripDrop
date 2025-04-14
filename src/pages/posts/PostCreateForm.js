import React, { useRef, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Image,
  Row,
} from "react-bootstrap";
import Upload from "../../assets/upload-image.png";
import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";
import { useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";

function PostCreateForm() {
    const [errors, setErrors] = useState({});
  
    const [postData, setPostData] = useState({
      title: "",
      category: "",
      description: "",
      image: "",
    });
  
    const { title, category, description, image } = postData;
    const imageInput = useRef(null);
    const history = useHistory();
  
    /* 
      Handles changes to the create form input fields
    */
    const handleChange = (e) => {
      setPostData({
        ...postData,
        [e.target.name]: e.target.value,
      });
    };