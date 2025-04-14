import React, { useEffect, useState } from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import Asset from "../../components/Asset";
import styles from "../../styles/ProfilePage.module.css";
import buttonsStyles from "../../styles/FollowButtons.module.css";
import appStyles from "../../App.module.css";
import columnStyles from "../../styles/SmallMenuContainer.module.css";
import PopularProfiles from "./PopularProfiles";
import LikeFeedAddPost from "../../components/LikeFeedAddPost";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import {
  useProfileData,
  useSetProfileData,
} from "../../contexts/ProfileDataContext";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "../posts/Post";
import { fetchMoreData } from "../../utils/utils";
import NoResultsImage from "../../assets/no-results-found.png";
import { ProfileEditDropdown } from "../../components/DropdownMenu";