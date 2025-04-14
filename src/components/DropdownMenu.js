import React from "react";
import { Dropdown, Tooltip, OverlayTrigger } from "react-bootstrap";
import styles from "../styles/DropdownMenu.module.css";
import { useHistory } from "react-router";

const DropdownDots = React.forwardRef(({ onClick }, ref) => (
    <i
      className="fas fa-ellipsis"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    />
  ));