import React, { Component } from "react";

import ContactsSearch from "./ContactsSearch";
import {
  deleteContact,
  selectContact
} from "../../store/actions/contactsActions";
import { getMessagesSuccess } from "../../store/actions/messageActions";
import SocketEmiter from "../../store/SocketEmiter";
import ContactButton from "./ContactButton";

export default class ContactsBox extends Component {
  constructor(props) {
    super(props);

    this.deleteContactHandler = this.deleteContactHandler.bind(this);
  }
  deleteContactHandler(e) {
    deleteContact(e.target.id);
  }
  componentDidMount() {
    SocketEmiter.getContactListRequest();
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
