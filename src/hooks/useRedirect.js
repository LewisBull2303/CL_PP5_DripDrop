import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../contexts/CurrentUserContext";

/**
 * Redirects the user based on authentication status.
 * 
 * @param {"loggedIn" | "loggedOut"} userAuthStatus
 * If "loggedIn", redirects to "/" if the user IS logged in.
 * If "loggedOut", redirects to "/" if the user is NOT logged in.
 */
export const useRedirect = (userAuthStatus) => {
  const currentUser = useCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      (userAuthStatus === "loggedIn" && currentUser) ||
      (userAuthStatus === "loggedOut" && !currentUser)
    ) {
      navigate("/");
    }
  }, [navigate, userAuthStatus, currentUser]);
};