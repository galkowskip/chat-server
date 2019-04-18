import React, { Component } from "react";

import InputBox from "./InputBox";
import MessageBox from "./MessageBox";
import ContactsBox from "./ContactsBox";
import { connect } from "react-redux";
import { sendMessage } from "../../store/actions/messageActions";

class MessageApp extends Component {
  constructor(props) {
    super(props);

    this.handleMessage = this.handleMessage.bind(this);
  }

  handleMessage(message) {
    sendMessage({
      messages: message,
      contact: this.props.contacts.activeContact
    });
  }

  render() {
    return (
      <div className="chat-container">
        <div className="sidebar-container">
          <ContactsBox
            userId={this.props.userId}
            contacts={this.props.contacts.items}
            activeContact={this.props.contacts.activeContact}
            searchItems={this.props.searchItems}
          />
        </div>
        <div className="message-container">
          <MessageBox messages={this.props.messages} user={this.props.user} />
          <InputBox
            handleMessage={this.handleMessage}
            activeContact={this.props.contacts.activeContact}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  contacts: state.contacts,
  messages: state.messages,
  searchItems: state.contacts.searchItems,
  user: state.user.data.user
});

export default connect(mapStateToProps)(MessageApp);
