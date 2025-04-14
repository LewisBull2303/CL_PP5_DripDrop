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

    /*
    Handles liking of the post by the user
    Sends a request to the API for a post with a specific id
    Increments the likes number by 1
  */
    const handleLike = async () => {
        try {
          const { data } = await axiosRes.post("/likes/", { post: id });
          setPosts((prevPosts) => ({
            ...prevPosts,
            results: prevPosts.results.map((post) => {
              return post.id === id
                ? { ...post, likes_number: post.likes_number + 1, like_id: data.id }
                : post;
            }),
          }));
        } catch (err) {
          // console.log(err);
        }
      };

      /*
    Handles unliking of the post already liked by the user
    Sends a request to the API for a post with a specific id
    Decrements the likes number by 1
  */
  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/likes/${like_id}/`);
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_number: post.likes_number - 1, like_id: null }
            : post;
        }),
      }));
    } catch (err) {
      // console.log(err);
    }
  };
    
  