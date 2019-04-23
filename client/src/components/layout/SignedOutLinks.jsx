import React from "react";
import { Link } from "react-router-dom";

/**
 * Navbars links if user is not logged
 */
const SignedOutLinks = () => {
  return (
    <ul id="nav-mobile" className="">
      <li>
        <Link to="/signin">Sign In</Link>
      </li>
      <li>
        <Link to="/login">Log In</Link>
      </li>
    </ul>
  );
};

export default SignedOutLinks;
