import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { shouldRefreshToken } from "../utils/utils";

export const useRedirect = (userAuthStatus) => {
  const history = useNavigate();

  useEffect(() => {
    const handleMount = async () => {
      const hasRefreshToken = shouldRefreshToken();

      // If the user is not logged in at all, don't try to refresh
      if (!hasRefreshToken) {
        if (userAuthStatus === "loggedOut") {
          history("/");
        }
        return;
      }

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
    };

    handleMount();
  }, [history, userAuthStatus]);
};
