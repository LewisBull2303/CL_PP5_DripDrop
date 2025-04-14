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

  /* 
    Handles the edit post form submission
    Redirects the user to the post page
  */
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
    
        formData.append("title", title);
        formData.append("category", category);
        formData.append("description", description);
    
        if (imageInput?.current?.files[0]) {
          formData.append("image", imageInput.current.files[0]);
        }
    
        try {
          await axiosReq.put(`/posts/${id}/`, formData);
          history.push(`/posts/${id}`);
        } catch (err) {
          // console.log(err);
          if (err.response?.status !== 401) {
            setErrors(err.response?.data);
          }
        }
      };

      const textFields = (
        <div className="text-center">
          <Form.Group>
            <Form.Label>Title</Form.Label>
            {errors.title?.map((message, idx) => (
              <Alert variant="warning" className={appStyles.Alert} key={idx}>
                {message}
              </Alert>
            ))}
            <Form.Control
              type="text"
              name="title"
              className={appStyles.Input}
              value={title}
              onChange={handleChange}
              aria-label="title"
            />
          </Form.Group>
    