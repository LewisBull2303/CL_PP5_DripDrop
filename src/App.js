import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Routes } from "react-router-dom";
import Landing from "./components/Landing";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import LogInForm from "./pages/auth/LogInForm";
import PostCreateForm from "./pages/posts/PostCreateForm";
import PostPage from "./pages/posts/PostPage";
import MainPostsPage from "./pages/posts/MainPostsPage";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import PostEditForm from "./pages/posts/PostEditForm";
import ProfilePage from "./pages/profiles/ProfilePage";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import UserPasswordForm from "./pages/profiles/UserPasswordForm";
import PageNotFound from "./components/PageNotFound";

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Body}>

      {!currentUser ? (
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/signup" element={<SignUpForm />} />
          <Route exact path="/login" element={ <LogInForm />} />
          <Route element={<Landing />} />
        </Routes>
      ) : (
        <Routes>
          <Route
            exact path="/"
            element={(
              <MainPostsPage 
                message="No results found" />
            )}
          />
          {/* Feed route */}
          <Route
            exact path="/feed"
            element={(
              <MainPostsPage
                message="No results found. Adjust the search keyword or follow a user."
                filter={`owner__followed__owner__profile=${profile_id}&`}
              />
            )}
          />
          {/* Like posts route */}
          <Route
            exact path="/liked"
            element={(
              <MainPostsPage
                message="No results found. Adjust the search keyword or like a post."
                filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`}
              />
            )}
          />

          <Route exact path="/posts/create" element={<PostCreateForm />} />
          <Route exact path="/posts/:id" element={<PostPage />} />
          <Route exact path="/posts/:id/edit" element={<PostEditForm />} />
          <Route exact path="/profiles/:id" element={<ProfilePage />} />
          <Route exact path="/profiles/:id/edit" element={<ProfileEditForm />}/>
          <Route exact path="/profiles/:id/edit/password" element={<UserPasswordForm />} />
          <Route element={<PageNotFound />} />
          <Route path="*">
            <PageNotFound />
          </Route>
        </Routes>
      )}
      </Container>
    </div>
  );
}

export default App;