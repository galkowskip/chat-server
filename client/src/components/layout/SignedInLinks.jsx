import React from "react";
import { Link } from "react-router-dom";

/**
 * Navabar links if user is logged
 * @param {*} props 
 */
const SignedInLinks = props => {
  return (
    <ul id="nav-mobile" className="right hide-on-med-and-down">
      <li>
        <Link to="/user">User</Link>
      </li>
      <li>
        <Link to="/logout" onClick={props.logoutUser}>
          Logout
        </Link>
      </li>
    </ul>
  );
};

export default SignedInLinks;
