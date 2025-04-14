import React, { useState } from "react";
import styles from "../../styles/Post.module.css";
import appStyles from "../../App.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Badge, Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import Like from "../../assets/like.png";
import Unlike from "../../assets/unlike.png";
import { DropdownMenu } from "../../components/DropdownMenu";
import FeedbackMsg from "../../components/FeedbackMsg";

const Post = (props) => {
    const {
      id,
      owner,
      profile_id,
      profile_image,
      title,
      description,
      category,
      comments_number,
      likes_number,
      like_id,
      image,
      updated_on,
      postPage,
      setPosts,
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;
    const history = useHistory();
    const [showAlert, setShowAlert] = useState(false);
  
    /*
      Handles editing of the post
    */
    const handleEdit = () => {
      history.push(`/posts/${id}/edit`);
    };

    /*
    Handles deleting of the post
    Shows the confirmation message to the user
    Redirects the user to the main page after a short delay
  */
  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/posts/${id}/`);
      setShowAlert(true);
      setTimeout(function () {
        history.push("/");
      }, 1500);
    } catch (err) {
      // console.log(err);
    }
  };
  