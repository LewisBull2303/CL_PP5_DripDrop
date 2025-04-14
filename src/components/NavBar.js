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
}