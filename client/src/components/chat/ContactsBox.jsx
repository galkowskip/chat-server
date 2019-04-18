import React, { Component } from "react";

import ContactsSearch from "./ContactsSearch";
import {
  deleteContact,
} from "../../store/actions/contactsActions";

import ContactButton from "./ContactButton";

export default class ContactsBox extends Component {
  constructor(props) {
    super(props);

    this.deleteContactHandler = this.deleteContactHandler.bind(this);
  }
  deleteContactHandler(e) {
    deleteContact(e.target.id);
  }

  render() {
    return (
      <div className="contacts-box">
        <div className="">
          <h3>Contacts</h3>
          {this.props.contacts.map(contact => {
            return contact ? (
              <ContactButton
                key={contact.cid}
                contact={contact}
                deleteContactHandler={this.deleteContactHandler}
              />
            ) : null;
          })}
          <ContactsSearch
            userId={this.props.userId}
            items={this.props.searchItems}
          />
        </div>
      </div>
    );
  }
}
