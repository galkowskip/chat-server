import React, { Component } from "react";

/**
 * Home page screen
 * @constructor
 */

class HomePage extends Component {
  render() {
    return (
      <main className="container landing-page">
        <div className="card main-card">
          <div>
            <h5>
              Simple chat powered by Node.js backend and communicating with
              client through socket.io.
            </h5>
          </div>
          <h4>This app is powered by: </h4>
          <div className="items-storage">
            <div className="card item">
              <h3>Front:</h3>
              <ul>
                <li>
                  <h4>Redux & Redux Saga</h4>
                </li>
                <li>
                  <h4>Socket.io</h4>
                </li>
                <li>
                  <h4>React</h4>
                </li>
              </ul>
            </div>
            <div className="card item">
              <h3>Back:</h3>
              <ul>
                <li>
                  <h4>Redux & Redux Saga</h4>
                </li>
                <li>
                  <h4>Socket.io</h4>
                </li>
                <li>
                  <h4>React</h4>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default HomePage;
