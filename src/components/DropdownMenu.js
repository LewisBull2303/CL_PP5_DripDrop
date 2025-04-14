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

/*
  Dropdown menu for post owners to choose to edit or delete a post
  Calls the handleEdit & handleDelete functions based on destructured props
*/
export const DropdownMenu = ({ handleEdit, handleDelete }) => {
    return (
      <Dropdown className="ml-auto" drop="left">
        <Dropdown.Toggle as={DropdownDots} />
  
        <Dropdown.Menu
          className="text-center"
          popperConfig={{ strategy: "fixed" }} // ensures the position of the dropdown menu is consistent across all browsers
        >
          <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
            <Dropdown.Item
              className={styles.DropdownItem}
              onClick={handleEdit}
              aria-label="edit"
            >
              <i className="fa-solid fa-pen"></i>
            </Dropdown.Item>
          </OverlayTrigger>
  
          <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>}>
            <Dropdown.Item
              className={styles.DropdownItem}
              onClick={handleDelete}
              aria-label="delete"
            >
              <i className="fas fa-trash" />
            </Dropdown.Item>
          </OverlayTrigger>
        </Dropdown.Menu>
      </Dropdown>
    );
  };