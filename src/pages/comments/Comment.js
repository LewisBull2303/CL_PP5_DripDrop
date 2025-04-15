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
}