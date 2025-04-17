import { useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

export const useRedirect = (userAuthStatus) => {
  const history = useNavigate();

  useEffect(() => {
    const handleMount = async () => {
      const refreshToken = localStorage.getItem("refreshToken"); // Or wherever you store it

      if (!refreshToken) {
        if (userAuthStatus === "loggedOut") {
          history("/");
        }
        return;
      }

      try {
        await axios.post("/dj-rest-auth/token/refresh/", {
          refresh: refreshToken,
        });
        if (userAuthStatus === "loggedIn") {
          history("/feed");
        }
      } catch (err) {
        console.error("Token refresh failed:", err);
        if (userAuthStatus === "loggedOut") {
          history("/");
        }
      }
    };

    handleMount();
  }, [history, userAuthStatus]);
};
