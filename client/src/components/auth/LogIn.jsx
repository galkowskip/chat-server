import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "../../store/actions/userActions";

/**
 * Creates a form for user to enter his login credentials. Maps error data from Redux Store, showing error is not implemented yet.
 * @constructor
 * 
 */
class LogIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  /**
   * Listens for usage of any input, changes components state accordingly.
   * @param {Event} e 
   */
  handleChange(e) {
    this.setState({
      ...this.state,
      [e.target.id]: e.target.value
    });
  }
  /**
   * Prevents default html form action and uses userAction.login() to send data to server.
   * @param {Event} e 
   */
  handleSubmit(e) {
    e.preventDefault();
    login(this.state);
  }
  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="card form">
          {this.props.error ? <p>{this.props.error}</p> : null}
          <div className="input-field">
            <label htmlFor="email">E-mail</label>
            <input onChange={this.handleChange} id="email" type="text" />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input onChange={this.handleChange} id="password" type="password" />
          </div>
          <input className="submit button" type="submit" value="Log In" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  error: state.error.loginError
});

export default connect(mapStateToProps)(LogIn);
