import React, { Component } from "react";

/**
 * Home page screen
 * @constructor
 */

class HomePage extends Component {
  render() {
    return (
      <div className="container landing-page">
        <div className="card main-card">
          <div className="card">
            <div className="main-card-img" />
          </div>
          <div className="card">
            <h3>Socket.io powered web communicator project</h3>
            <ul>
              <li>Fast</li>
              <li>Secure</li>
              <li>Reliable and Simple</li>
            </ul>
          </div>
        </div>

        <main className="">
          <hr />
          <h1 className="text-white">This app is powered by: </h1>
          <div className="items-storage">
            <div className="card item">
              <div className="redux-img" />
              <h3>Redux & Redux Saga</h3>
            </div>
            <div className="card item">
              <div className="react-img" />
              <h3>React</h3>
            </div>
            <div className="card item">
              <div className="firebase-img" />
              <h3>Firebase</h3>
            </div>
          </div>
        </main>
        <footer />
      </div>
    );
  }
}

export default  HomePage