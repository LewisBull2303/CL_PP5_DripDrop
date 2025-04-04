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