import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Image,
  Row,
} from "react-bootstrap";
import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import { useHistory, useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";

function PostEditForm() {
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
    const { id } = useParams(); // get a parameter out of the URL

    /*
    Handles API request using the post id parameter
    Gets the data about the posts user wants to edit
    Prevents editing other users' posts
    and redirects to main page if attempted
  */
  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/${id}/`);
        const { title, category, description, image, is_owner } = data;

        is_owner
          ? setPostData({ title, category, description, image })
          : history.push("/");
      } catch (err) {
        //console.log(err)
      }
    };

    handleMount();
  }, [history, id]);

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