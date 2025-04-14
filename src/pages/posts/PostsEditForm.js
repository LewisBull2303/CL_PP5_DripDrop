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
    
          <Form.Group>
        <Form.Label>Category</Form.Label>
        {errors.category?.map((message, idx) => (
          <Alert variant="warning" className={appStyles.Alert} key={idx}>
            {message}
          </Alert>
        ))}
        <Form.Control
          as="select"
          name="category"
          className={appStyles.Input}
          value={category}
          onChange={handleChange}
          aria-label="category"
        >
        <option value="Classic Casual">"Classic Casual"</option>
        <option value="Sporty (Athleisure)">"Sporty (Athleisure)"</option>
        <option value="Streetwear">"Streetwear"</option>
        <option value="Bohemian (Boho)">"Bohemian (Boho)"</option>
        <option value="Preppy">"Preppy"</option>
        <option value="Hipster">"Hipster"</option>
        <option value="Grunge">"Grunge"</option>
        <option value="Minimalist">"Minimalist"</option>
        <option value="Y2K Fashion">"Y2K Fashion"</option>
        <option value="Soft Girl">"Soft Girl"</option>
        <option value="VSCO Girl">"VSCO Girl"</option>
        <option value="Cottagecore">"Cottagecore"</option>
        <option value="E-Girl">"E-Girl"</option>
        <option value="Skater">"Skater"</option>
        <option value="Dark Academia">"Dark Academia"</option>
        <option value="Light Academia">"Light Academia"</option>
        <option value="Indie">"Indie"</option>
        <option value="Business Casual">"Business Casual"</option>
        <option value="Business Professional">"Business Professional"</option>
        <option value="Smart Casual">"Smart Casual"</option>
        <option value="Power Dressing">"Power Dressing"</option>
        <option value="Punk">"Punk"</option>
        <option value="Gothic">"Gothic"</option>
        <option value="Cyberpunk">"Cyberpunk"</option>
        <option value="Rockstar Chic">"Rockstar Chic"</option>
        <option value="Steampunk">"Steampunk"</option>
        <option value="Emo">"Emo"</option>
        <option value="Gyaru">"Gyaru"</option>
        <option value="Vintage">"Vintage"</option>
        <option value="Retro">"Retro"</option>
        <option value="Kawaii">"Kawaii"</option>
        <option value="Harajuku">"Harajuku"</option>
        <option value="Lolita">"Lolita"</option>
        <option value="K-Pop Fashion">"K-Pop Fashion"</option>
        <option value="Hippie">"Hippie"</option>
        <option value="Winter Fashion">"Winter Fashion"</option>
        <option value="Summer Fashion">"Summer Fashion"</option>
        <option value="Resort Wear">"Resort Wear"</option>
        <option value="Workwear (Utility Fashion)">"Workwear (Utility Fashion)"</option>
        <option value="Avant-Garde">"Avant-Garde"</option>
        <option value="Haute Couture">"Haute Couture"</option>
        <option value="Luxury Chic">"Luxury Chic"</option>
        <option value="Sci-Fi/Fantasy Fashion">"Sci-Fi/Fantasy Fashion"</option>
        <option value="Rave/Festival Fashion">"Rave/Festival Fashion"</option>
        <option value="Normcore">"Normcore"</option>
        </Form.Control>
      </Form.Group>

      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="description"
          className={appStyles.Input}
          value={description}
          onChange={handleChange}
          aria-label="post description"
        />
      </Form.Group>

      <Button
        className={`my-3 ${appStyles.button}`}
        onMouseDown={(e) => e.preventDefault()}
        type="submit"
      >
        Save
      </Button>

      <Button
        className={`${appStyles.button} mx-3`}
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => history.goBack()}
      >
        Cancel
      </Button>
    </div>
  );

