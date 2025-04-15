import React, { useState } from "react";
import { Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import styles from "../../styles/Comment.module.css";
import { DropdownMenu } from "../../components/DropdownMenu";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosRes } from "../../api/axiosDefaults";
import CommentEditForm from "./CommentEditForm";
import FeedbackMsg from "../../components/FeedbackMsg";

const Comment = (props) => {
    const {
      profile_id,
      profile_image,
      owner,
      updated_on,
      content,
      id,
      setPost,
      setComments,
    } = props;

    const [showEditForm, setShowEditForm] = useState(false);
    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;
    const [showAlert, setShowAlert] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);

    /*
    Handles deleting of the comment based on its id
    Removes the comment from all comments
    Displays a feedback message to a user in place of deleted comment
    Decrements the number of current comments by 1
  */
  const handleDelete = async () => {
    setIsDeleted(true);

    setTimeout(async () => {
      try {
        await axiosRes.delete(`/comments/${id}/`);
        setPost((prevPost) => ({
          results: [
            {
              ...prevPost.results[0],
              comments_number: prevPost.results[0].comments_number - 1,
            },
          ],
        }));

        setComments((prevComments) => ({
            ...prevComments,
            results: prevComments.results.filter((comment) => comment.id !== id),
          }));
        } catch (err) {
          //console.log(err)
        }
      }, 2500);
    };
  
}