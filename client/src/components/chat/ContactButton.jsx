import React, { Component } from "react";
import { selectContact } from "../../store/actions/contactsActions";

export default class ContactButton extends Component {
  selectContactHandler(e) {
    selectContact(e.target.id);
  }
  render() {
    return (
      <div key={this.props.contact.cid} className="button-group">
        <button
          onClick={this.selectContactHandler}
          id={this.props.contact.cid}
          className="button"
        >
          {this.props.contact.targets.map(user => {
            return user ? user.username : null;
          })}
        </button>
        <button
          className="button small"
          id={this.props.contact.cid}
          onClick={this.props.deleteContactHandler}
        >
          X
        </button>
      </div>
    );
  }
}
