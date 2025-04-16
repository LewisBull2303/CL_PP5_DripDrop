import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { shouldRefreshToken } from "../utils/utils";

export const useRedirect = (userAuthStatus) => {
  const history = useNavigate();

  useEffect(() => {
    const handleMount = async () => {
      const hasRefreshToken = shouldRefreshToken();

      if (hasRefreshToken) {
        try {
          await axios.post("/dj-rest-auth/token/refresh/");
          if (userAuthStatus === "loggedIn") {
            history("/");
          }
        } catch (err) {
          if (userAuthStatus === "loggedOut") {
            history("/");
          }
        }
      } else {
        if (userAuthStatus === "loggedOut") {
          history("/");
        }
      }
    };

    handleMount();
  }, [history, userAuthStatus]);
};
