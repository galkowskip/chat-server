import React, { Component } from "react";
import { connect } from "react-redux";

import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";

import { logout } from "../../store/actions/userActions";
import { navbarAction } from "../../store/actions/navbarActions";

const RenderLinks = user => {
  user = user.user;
  if (user.isLoggedIn)
    return <SignedInLinks user={user.data} logoutUser={logout} />;
  else return <SignedOutLinks user={user.data} />;
};

/**
 * Navbar used in all main routes, has data of active user, depending on if user is logged he has access to different links and options
 * @constructor
 * @param {Object} user 
 */
class Navbar extends Component {
  handleClick() {
    navbarAction();
  }
  render() {
    return (
      <nav>
        <a href="/" className="logo">
          Home
        </a>
        <p onClick={this.handleClick} className="burger-nav" />
        <RenderLinks user={this.props.user} />
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  navbar: state.navbar
});

export default connect(mapStateToProps)(Navbar);
