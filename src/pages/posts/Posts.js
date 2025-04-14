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