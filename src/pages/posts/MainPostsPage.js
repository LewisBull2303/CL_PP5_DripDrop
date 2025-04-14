import React, { useEffect, useState } from "react";
import { Badge, Col, Container, Form, Row } from "react-bootstrap";
import styles from "../../styles/MainPostsPage.module.css";
import columnStyles from "../../styles/SmallMenuContainer.module.css";
import appStyles from "../../App.module.css";
import Post from "./Post";
import Asset from "../../components/Asset";
import NoResultsImage from "../../assets/no-results-found.png";
import LikeFeedAddPost from "../../components/LikeFeedAddPost";
import { useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

function MainPostsPage({ message, filter = "" }) {
    const [posts, setPosts] = useState({ results: [] });
    const [category, setCategory] = useState(null);
    const [hasLoaded, setHasLoaded] = useState(false);
    // detect the url change between home, feed & liked pages
    const { pathname } = useLocation();
    const currentUser = useCurrentUser();
    const [query, setQuery] = useState("");
}