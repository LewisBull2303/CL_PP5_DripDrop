import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export const useRedirect = (userAuthStatus) => {
  const history = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleMount = async () => {
      try {
        await axios.post("/dj-rest-auth/token/refresh/");
        if (userAuthStatus === "loggedIn") {
          history("/");
        }
      } catch (err) {
        if (userAuthStatus === "loggedOut") {
          history("/");
        }
      } finally {
        setIsLoading(false);
      }
    };

    handleMount();
  }, [history, userAuthStatus]);

  return isLoading;
};