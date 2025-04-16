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
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/login" element={ <LogInForm />} />
          <Route element={<Landing />} />
        </Routes>
      ) : (
        <Routes>
          <Route
            path="/"
            element={(
              <MainPostsPage 
                message="No results found" />
            )}
          />
          {/* Feed route */}
          <Route
            path="/feed"
            element={(
              <MainPostsPage
                message="No results found. Adjust the search keyword or follow a user."
                filter={`owner__followed__owner__profile=${profile_id}&`}
              />
            )}
          />
          {/* Like posts route */}
          <Route
            path="/liked"
            element={(
              <MainPostsPage
                message="No results found. Adjust the search keyword or like a post."
                filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`}
              />
            )}
          />

          <Route path="/posts/create" element={<PostCreateForm />} />
          <Route path="/posts/:id" element={<PostPage />} />
          <Route path="/posts/:id/edit" element={<PostEditForm />} />
          <Route path="/profiles/:id" element={<ProfilePage />} />
          <Route path="/profiles/:id/edit" element={<ProfileEditForm />}/>
          <Route path="/profiles/:id/edit/password" element={<UserPasswordForm />} />
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