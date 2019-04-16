import React, { Component } from "react";
import SocketEmiter from "../../store/SocketEmiter";
import { addNewContact } from "../../store/actions/contactsActions";

export default class ContactsSearch extends Component {
  constructor(props) {
    super(props);

    this.handleInput = this.handleInput.bind(this);
    this.contactAdd = this.contactAdd.bind(this);
  }

  handleInput(e) {
    SocketEmiter.searchContactsRequest(e.target.value);
  }

  contactAdd(e) {
    addNewContact(e.target.id);
  }
  render() {
    return (
      <div className="contacts-search">
        {this.props.items &&
          this.props.items.map(item => {
            return (
              <button
                className=""
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
          <input id="searchBox" type="text" onInput={this.handleInput} />
        </div>
      </div>
    );
  }
}
