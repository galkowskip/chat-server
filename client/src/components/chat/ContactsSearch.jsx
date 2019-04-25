import React, { Component } from "react";
import SocketEmiter from "../../store/SocketEmiter";
import { addNewContact } from "../../store/actions/contactsActions";

/**
 * Small input in sidebar used to search for users. If input matches user new buttons are created for user user to click and create new contacts
 * @constructor
 */

class ContactsSearch extends Component {
  constructor(props) {
    super(props);

    this.handleInput = this.handleInput.bind(this);
    this.contactAdd = this.contactAdd.bind(this);
  }
  /**
   * Fires searchContactsRequest action for every time input is changed
   * @param {Event} e
   */
  handleInput(e) {
    SocketEmiter.searchContactsRequest(e.target.value);
  }
  /**
   * Tells server to add new contact with targets id as param
   * @param {Event} e
   */
  contactAdd(e) {
    addNewContact(e.target.id);
  }
  render() {
    return (
      <div className="contacts-search">
        <hr />
        {this.props.items &&
          this.props.items.map(item => {
            return (
              <button
                className="button searched"
                onClick={this.contactAdd}
                id={item.id}
                key={item.id}
              >
                {item.username}
              </button>
            );
          })}
        <div className="input-field">
          <label htmlFor="searchBox">Search for contacts</label>
          <input
            autoComplete="off"
            id="searchBox"
            type="text"
            onInput={this.handleInput}
          />
        </div>
      </div>
    );
  }
}

export default ContactsSearch;
