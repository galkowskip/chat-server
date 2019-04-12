import React, { Component } from "react";

export default class InputBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      ...this.state,
      [e.target.id]: e.target.value
    });
  }

  handleSubmit(e) {
    //will dispatch action
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
