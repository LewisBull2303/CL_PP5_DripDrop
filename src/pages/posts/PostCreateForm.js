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

    /* 
    Handles change to the file (image) input field
  */
  const handleChangeImage = (e) => {
    if (e.target.files.length) {
      URL.revokeObjectURL(image); // for changing image after adding one
      setPostData({
        ...postData,
        image: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  /* 
    Handles the create post form submission
    Refreshes the user's access token before making a request to create a post
  */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("image", imageInput.current.files[0]);

    try {
      const { data } = await axiosReq.post("/posts/", formData);
      history.push(`/posts/${data.id}`);
    } catch (err) {
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };