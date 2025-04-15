import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export const useRedirect = (userAuthStatus) => {
    const history = useNavigate();
    /*
    Checks if the user is logged in
    if yes, refreshes the access token
    Redirects the user to the home page
  */
    useEffect(() => {
        const handleMount = async () => {
          try {
            await axios.post("/dj-rest-auth/token/refresh/");
            if (userAuthStatus === "loggedIn") {
              history.push("/");
            }
          } catch (err) {
            if (userAuthStatus === "loggedOut") {
              history.push("/");
            }
          }
        };
    
        handleMount();
      }, [history, userAuthStatus]);
    };