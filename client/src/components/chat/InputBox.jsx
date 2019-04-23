import React, { Component } from "react";

/**
 * Used as input for user to type his message in
 * @constructor
 */
class InputBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
 /**
  * Maps component state to inputs value
  * @param {Event} e 
  */
  handleChange(e) {
    this.setState({
      ...this.state,
      [e.target.id]: e.target.value
    });
  }

  /**
   * Sends message to server
   * @param {Event} e 
   */
  handleSubmit(e) {
    e.preventDefault();
    this.props.handleMessage(this.state.message);
    this.setState({ message: "" });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="input-box">
        <div className="input-field">
          <textarea onChange={this.handleChange} id="message" className="" />
          <input type="submit" className="button" value="Send" />
        </div>
      </form>
    );
  }
}

export default InputBox