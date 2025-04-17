import { useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

export const useRedirect = (userAuthStatus) => {
  const history = useNavigate();

  useEffect(() => {
    const handleMount = async () => {
      try {
        await axios.post("/dj-rest-auth/token/refresh/");
        if (userAuthStatus === "loggedIn") {
          history("/feed");
        }
      } catch (err) {
        if (userAuthStatus === "loggedOut") {
          history("/");
        }
      }
    };

    handleMount();
  }, [history, userAuthStatus]);
};