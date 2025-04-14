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

    /*
    Handles API request using the filters for each of pages
    to fetch relevant posts to the filter
    Displays all the posts, just posts by the profiles followed, 
    just the liked posts or posts in a specific category
    Shows a loading spinner when required
  */
  useEffect(() => {
    const fetchPosts = async () => {
        try {
            const { data } = await axiosReq.get(
                `/posts/?${filter}search=${query}${
                    category !== null ? `&category=${category}` : ""
                }`
            );
            setPosts(data);
            setHasLoaded(true);
        } catch (err) {
          // console.log(err)
        }
    };
    setHasLoaded(false);
    /*
      Delays making an API request and fetching posts of 1 second
      instead of on each key stroke
    */
    const timer = setTimeout(() => {
      fetchPosts();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, pathname, currentUser, category]);

  return (
    <Container>
      <Row>
        <Col className={`${columnStyles.SplitColumns} pt-2 p-0 p-lg-2`} lg={4}>
            <LikeFeedAddPost />

          <Container
            className={`${appStyles.Content} ${columnStyles.CollapsedColumn} mb-2`}
          >
            <PopularProfiles />
          </Container>

          <Container
            className={`${appStyles.Content} ${columnStyles.CollapsedColumn} ${columnStyles.CategoriesColumn}`}
          >
            <p className=" font-weight-bold ml-2">Post categories</p>
                <Badge variant="secondary" pill className={`${styles.Badge}`} onClick={() => setCategory("Classic Casual")}>Classic Casual</Badge>
                <Badge variant="secondary" pill className={`${styles.Badge}`} onClick={() => setCategory("Sporty (Athleisure)")}>Sporty (Athleisure)</Badge>
                <Badge variant="secondary" pill className={`${styles.Badge}`} onClick={() => setCategory("Streetwear")}>Streetwear</Badge>
                <Badge variant="secondary" pill className={`${styles.Badge}`} onClick={() => setCategory("Bohemian (Boho)")}>Bohemian (Boho)</Badge>
                <Badge variant="secondary" pill className={`${styles.Badge}`} onClick={() => setCategory("Preppy")}>Preppy</Badge>
                <Badge variant="secondary" pill className={`${styles.Badge}`} onClick={() => setCategory("Hipster")}>Hipster</Badge>
                <Badge variant="secondary" pill className={`${styles.Badge}`} onClick={() => setCategory("Grunge")}>Grunge</Badge>
                <Badge variant="secondary" pill className={`${styles.Badge}`} onClick={() => setCategory("Minimalist")}>Minimalist</Badge>
                <Badge variant="secondary" pill className={`${styles.Badge}`} onClick={() => setCategory("Y2K Fashion")}>Y2K Fashion</Badge>
                <Badge variant="secondary" pill className={`${styles.Badge}`} onClick={() => setCategory("Soft Girl")}>Soft Girl</Badge>
                <Badge variant="secondary" pill className={`${styles.Badge}`} onClick={() => setCategory("VSCO Girl")}>VSCO Girl</Badge>
                <Badge variant="secondary" pill className={`${styles.Badge}`} onClick={() => setCategory("Cottagecore")}>Cottagecore</Badge>
                <Badge variant="secondary" pill className={`${styles.Badge}`} onClick={() => setCategory("E-Girl")}>E-Girl</Badge>
                <Badge variant="secondary" pill className={`${styles.Badge}`} onClick={() => setCategory("Skater")}>Skater</Badge>
                <Badge variant="secondary" pill className={`${styles.Badge}`} onClick={() => setCategory("Dark Academia")}>Dark Academia</Badge>
                <Badge variant="secondary" pill className={`${styles.Badge}`} onClick={() => setCategory("Light Academia")}>Light Academia</Badge>
                <Badge variant="secondary" pill className={`${styles.Badge}`} onClick={() => setCategory("Indie")}>Indie</Badge>
                <Badge variant="secondary" pill className={`${styles.Badge}`} onClick={() => setCategory("Business Casual")}>Business Casual</Badge>
                <Badge variant="secondary" pill className={`${styles.Badge}`} onClick={() => setCategory("Business Professional")}>Business Professional</Badge>
                <Badge variant="secondary" pill className={`${styles.Badge}`} onClick={() => setCategory("Smart Casual")}>Smart Casual</Badge>
                <Badge variant="secondary" pill className={`${styles.Badge}`} onClick={() => setCategory("Power Dressing")}>Power Dressing</Badge>
                <Badge variant="secondary" pill className={`${styles.Badge}`} onClick={() => setCategory("Punk")}>Punk</Badge>
                <Badge variant="secondary" pill className={`${styles.Badge}`} onClick={() => setCategory("Gothic")}>Gothic</Badge>
                <Badge variant="secondary" pill className={`${styles.Badge}`} onClick={() => setCategory("Cyberpunk")}>Cyberpunk</Badge>
                <Badge variant="secondary" pill className={`${styles.Badge}`} onClick={() => setCategory("Rockstar Chic")}>Rockstar Chic</Badge>
                <Badge variant="secondary" pill className={`${styles.Badge}`} onClick={() => setCategory("Steampunk")}>Steampunk</Badge>
                <Badge variant="secondary" pill className={`${styles.Badge}`} onClick={() => setCategory("Emo")}>Emo</Badge>
                <Badge variant="secondary" pill className={`${styles.Badge}`} onClick={() => setCategory("Gyaru")}>Gyaru</Badge>
                <Badge variant="secondary" pill className={`${styles.Badge}`} onClick={() => setCategory("Vintage")}>Vintage</Badge>
                <Badge variant="secondary" pill className={`${styles.Badge}`} onClick={() => setCategory("Retro")}>Retro</Badge>
                <Badge variant="secondary" pill className={`${styles.Badge}`} onClick={() => setCategory("Kawaii")}>Kawaii</Badge>
                <Badge variant="secondary" pill className={`${styles.Badge}`} onClick={() => setCategory("Harajuku")}>Harajuku</Badge>
                <Badge variant="secondary" pill className={`${styles.Badge}`} onClick={() => setCategory("Lolita")}>Lolita</Badge>
                <Badge variant="secondary" pill className={`${styles.Badge}`} onClick={() => setCategory("K-Pop Fashion")}>K-Pop Fashion</Badge>
                <Badge variant="secondary" pill className={`${styles.Badge}`} onClick={() => setCategory("Hippie")}>Hippie</Badge>
                <Badge variant="secondary" pill className={`${styles.Badge}`} onClick={() => setCategory("Winter Fashion")}>Winter Fashion</Badge>
                <Badge variant="secondary" pill className={`${styles.Badge}`} onClick={() => setCategory("Summer Fashion")}>Summer Fashion</Badge>
                <Badge variant="secondary" pill className={`${styles.Badge}`} onClick={() => setCategory("Resort Wear")}>Resort Wear</Badge>
                <Badge variant="secondary" pill className={`${styles.Badge}`} onClick={() => setCategory("Workwear (Utility Fashion)")}>Workwear (Utility Fashion)</Badge>
                <Badge variant="secondary" pill className={`${styles.Badge}`} onClick={() => setCategory("Avant-Garde")}>Avant-Garde</Badge>
                <Badge variant="secondary" pill className={`${styles.Badge}`} onClick={() => setCategory("Haute Couture")}>Haute Couture</Badge>
                <Badge variant="secondary" pill className={`${styles.Badge}`} onClick={() => setCategory("Luxury Chic")}>Luxury Chic</Badge>
                <Badge variant="secondary" pill className={`${styles.Badge}`} onClick={() => setCategory("Sci-Fi/Fantasy Fashion")}>Sci-Fi/Fantasy Fashion</Badge>
                <Badge variant="secondary" pill className={`${styles.Badge}`} onClick={() => setCategory("Rave/Festival Fashion")}>Rave/Festival Fashion</Badge>
                <Badge variant="secondary" pill className={`${styles.Badge}`} onClick={() => setCategory("Normcore")}>Normcore</Badge>
            </Container>
        </Col>
        <Col className="py-2 p-0 p-lg-2" lg={8}>

        {/* Posts text search bar */}
        <i className={`fas fa-search ${styles.SearchIcon}`} />
        <Form
          className={styles.SearchBar}
          onSubmit={(e) => e.preventDefault()}
        >
          
          <Form.Control
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            className="mr-sm-2"
            placeholder="Search posts"
            aria-label="search bar"
          />
          <i className={`fa-solid fa-eraser ${styles.Clear}`} onClick={() => setQuery("")} />
        </Form>

        {hasLoaded ? (
          <>
            {posts.results.length ? (
              // InfiniteScroll component handles loading more pages of posts as the user scrolls
              <InfiniteScroll
                children={posts.results.map((post) => (
                  <Post 
                    key={post.id} 
                    {...post} 
                    setPosts={setPosts} 
                    // truncate post description on the main page to 500 characters
                    description={post.description.length > 500 ? (post.description.slice(0, 500) + " .....") : post.description} />
                ))}
                dataLength={posts.results.length}
                loader={<Asset spinner />}
                hasMore={!!posts.next}
                next={() => fetchMoreData(posts, setPosts)}
              />
            ) : (
              // if no results found, show no results asset with a relevant message
              <Container className={appStyles.Content}>
                <Asset src={NoResultsImage} width={20} height={20} message={message} />
              </Container>
            )}
          </>
        ) : (
          // display a loading spinner if the posts haven't been loaded yet
          <Container className={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}

        </Col>
      </Row>
    </Container>
  );
}

export default MainPostsPage;
