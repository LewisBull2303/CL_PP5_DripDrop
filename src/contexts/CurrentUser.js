import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { axiosRes, axiosReq } from "../api/axiosDefaults";
import { useHistory } from "react-router-dom";
import { removeTokenTimestamp, shouldRefreshToken } from "../utils/utils";

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);


export const CurrentUserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const history = useHistory();
  /*
    Handles the request of current users data from the API
    completes the request when the component is mounted
  */
    const handleMount = async () => {
        try {
          const { data } = await axiosRes.get("dj-rest-auth/user/");
          setCurrentUser(data);
        } catch (err) {
          // console.log(err);
        }
      };
    
      useEffect(() => {
        handleMount();
      }, []);

    /* 
    Handles access tokens
    Redirects user to log-in page if refreshing of token fails
    */
    useMemo(() => {
        axiosReq.interceptors.request.use(
        async (config) => {
            if (shouldRefreshToken()) {
            try {
                await axios.post("/dj-rest-auth/token/refresh/");
            } catch (err) {
                setCurrentUser((prevCurrentUser) => {
                if (prevCurrentUser) {
                    history.push("/login");
                }
                return null;
                });
                removeTokenTimestamp();
                return config;
            }
            }
            return config;
        },
        (err) => {
            return Promise.reject(err);
        }
        );

        axiosRes.interceptors.response.use(
            (response) => response,
            async (err) => {
              if (err.response?.status === 401) {
                try {
                  await axios.post("/dj-rest-auth/token/refresh/");
                } catch (err) {
                  setCurrentUser((prevCurrentUser) => {
                    if (prevCurrentUser) {
                      history.push("/login");
                    }
                    return null;
                  });
                  removeTokenTimestamp();
                }
                // if no error refreshing the token
                return axios(err.config);
              }
              return Promise.reject(err);
            }
          );
        }, [history]);
        return (
            <CurrentUserContext.Provider value={currentUser}>
              <SetCurrentUserContext.Provider value={setCurrentUser}>
                {children}
              </SetCurrentUserContext.Provider>
            </CurrentUserContext.Provider>
          );
        };
