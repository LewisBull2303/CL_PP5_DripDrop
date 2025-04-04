import { createContext, useContext, useEffect, useState } from "react";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useCurrentUser } from "./CurrentUserContext";
import { followHelper, unfollowHelper } from "../utils/utils";

export const ProfileDataContext = createContext();
export const SetProfileDataContext = createContext();

export const useProfileData = () => useContext(ProfileDataContext);
export const useSetProfileData = () => useContext(SetProfileDataContext);

export const ProfileDataProvider = ({ children }) => {
    const [profileData, setProfileData] = useState({
      pageProfile: { results: [] },
      popularProfiles: { results: [] },
    });

    const currentUser = useCurrentUser();

    /*
    Makes a request to the /followers/ endpoint
    Gets the profile ID
    If the the user just followed (clicked)
    Updates profile page and PopularProfiles data
  */
  const handleFollow = async (clickedProfile) => {
    try {
      const { data } = await axiosRes.post("/followers/", {
        followed: clickedProfile.id,
      });

      setProfileData((prevState) => ({
        ...prevState,
        pageProfile: {
          results: prevState.pageProfile.results.map((profile) =>
            followHelper(profile, clickedProfile, data.id)
          ),
        },
        popularProfiles: {
          ...prevState.popularProfiles,
          results: prevState.popularProfiles.results.map((profile) =>
            followHelper(profile, clickedProfile, data.id)
          ),
        },
      }));
    } catch (err) {
      console.log(err);
    }
  };

  /*
    Makes a request to the /followers/ endpoint
    Get the profile ID
    If the the user just unfollowed (clicked)
    Updates PopularProfiles data
  */
    const handleUnfollow = async (clickedProfile) => {
        try {
          await axiosRes.delete(`/followers/${clickedProfile.following_id}/`);
          setProfileData((prevState) => ({
            ...prevState,
            pageProfile: {
              results: prevState.pageProfile.results.map((profile) =>
                unfollowHelper(profile, clickedProfile)
              ),
            },
            popularProfiles: {
              ...prevState.popularProfiles,
              results: prevState.popularProfiles.results.map((profile) =>
                unfollowHelper(profile, clickedProfile)
              ),
            },
          }));
        } catch (err) {
          // console.log(err);
        }
      };
}