import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { signIn } from "../../store/actions/userActions";


/**
 * Register new user screen.
 */
class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
/**
 * Sets state equal to inputs value
 * @param {Event} e
 */
  handleChange(e) {
    this.setState({
      ...this.state,
      [e.target.id]: e.target.value
    });
  }

  /**
   * Sends form to server
   * @param {Event} e 
   */
  handleSubmit(e) {
    //will dispatch action
    e.preventDefault();
    signIn(this.state);
  }

  render() {
    if (this.props.signInCompleted) {
      return <Redirect to="/login" />;
    } else {
      return (
        <div className="container">
          <form onSubmit={this.handleSubmit} className="card form">
            {this.props.error ? <p>{this.props.error}</p> : null}
            <div className="input-field">
              <label htmlFor="email">E-mail</label>
              <input onChange={this.handleChange} id="email" type="email" />
            </div>
            <div className="input-field">
              <label htmlFor="firstName">First Name</label>
              <input onChange={this.handleChange} id="firstName" type="text" />
            </div>
            <div className="input-field">
              <label htmlFor="lastName">Last Name</label>
              <input onChange={this.handleChange} id="lastName" type="text" />
            </div>
            <div className="input-field">
              <label htmlFor="username">Username</label>
              <input onChange={this.handleChange} id="username" type="text" />
            </div>
            <div className="input-field">
              <label htmlFor="password">Password</label>
              <input
                onChange={this.handleChange}
                id="password"
                type="password"
              />
            </div>
            <div className="input-field">
              <label htmlFor="confirmPassword">Confirm password</label>
              <input
                onChange={this.handleChange}
                id="confirmPassword"
                type="password"
              />
            </div>
            <input className="submit button" type="submit" value="Sign In" />
          </form>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  signInCompleted: state.signIn.signInCompleted,
  error: state.error.signinError
});

export default connect(mapStateToProps)(SignIn);
