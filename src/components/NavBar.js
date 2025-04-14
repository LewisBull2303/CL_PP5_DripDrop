import React from "react"
import { Navbar, NavDropdown, Container, Nav } from "react-bootstrap";
import logo from "../assets/logo.png";
import styles from "../styles/NavBar.Module.css";
import { NavLink } from "react-router-dom";
import {
    useCurrentUser,
    useSetCurrentUser,
} from "../contexts/CurrentUser";
import Avatar from "./Avatar";
import axios from "axios";
import useClickOustideToggle from "../hooks/useClickOutsideToggle";
import { removeTokenTimestamp } from "../utils/utils";

const NavBar = () => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();
  
    const { expanded, setExpanded, ref } = useClickOutsideToggle();
  
    /*
      Handles user logout
      Removes saved current user
      Redirects to the landing page in <NavLink>
    */
    const handleLogOut = async () => {
      try {
        await axios.post("dj-rest-auth/logout/");
        setCurrentUser(null);
        setExpanded(false);
        removeTokenTimestamp();
      } catch (err) {
        //console.log(err)
      }
    }; 

    /* 
    Displays current username with its avatar in the navbar
    With a dropdown option to view user profile or log-out on click
  */
  const loggedInNavBar = (
    <>
      <NavDropdown
        title={
          <div className="exp">
            <Avatar
              src={currentUser?.profile_image}
              height={40}
              className="exp"
            />
            {currentUser?.username}
          </div>
        }
        id="basic-nav-dropdown"
      >
        <NavDropdown.Item className={`${styles.Dropdown} text-right`}>
          <NavLink to={`/profiles/${currentUser?.profile_id}`}>Profile</NavLink>
        </NavDropdown.Item>
        <NavDropdown.Item className={`${styles.Dropdown} text-right`}>
          <NavLink to="/" onClick={handleLogOut}>
            Log out
          </NavLink>
        </NavDropdown.Item>
      </NavDropdown>
    </>
  );

  /* 
    Navbar visble to user not logged-in
    With options to create a new account or log in to an existing one
  */
    const loggedOutNavBar = (
        <>
          <NavLink
            className={styles.NavLink}
            activeClassName={styles.Active}
            to="/signup"
          >
            <i className="fa-solid fa-user-plus"></i>Sign up
          </NavLink>
          <NavLink
            className={styles.NavLink}
            activeClassName={styles.Active}
            to="/login"
          >
            <i className="fa-solid fa-right-to-bracket"></i>Log in
          </NavLink>
        </>
      );
}