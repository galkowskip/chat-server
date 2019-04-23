import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { connect } from "react-redux";

//Components
import Navbar from "./components/layout/Navbar";
import HomePage from "./components/layout/HomePage";
import SignIn from "./components/auth/SignIn";
import LogIn from "./components/auth/LogIn";
import MessageApp from "./components/chat/MessageApp";
import Logout from "./components/auth/Logout";

//Socket
import socket from "./config/socketConfig";
import SocketObserver from "./store/SocketObserver";

//Style
import "./style/main.css";
import { store } from "./index";
import SocketEmiter from "./store/SocketEmiter";

/**
 * Highest order app component. Serves as routes manager for whole app. Uses socket.io Observer class to listen for upcoming events. 
 * @constructor
 * 
 */
class App extends Component {
  componentDidMount() {
    const Observer = new SocketObserver(socket, store);
    Observer.watchAll();

    SocketEmiter.checkUser()
  }
  render() {
    return (
      <Router>
        <div id="app">
          <Navbar user={this.props.user} />
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                if (this.props.user.isLoggedIn)
                  return <MessageApp userId={this.props.user.data.uid} />;
                else return <HomePage />;
              }}
            />

            <Route
              path="/signin"
              render={() => {
                if (!this.props.user.isLoggedIn) return <SignIn />;
                else return <Redirect to="/" />;
              }}
            />

            <Route
              path="/login"
              render={() => {
                if (!this.props.user.isLoggedIn) return <LogIn />;
                else return <Redirect to="/" />;
              }}
            />
            <Route
              path="/logout"
              render={() => {
                return <Logout />;
              }}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
