import React from "react";

import MessageCard from "./MessageCard";

/**
 * Box containing array of messages in active conversation, creating the list of messages. Returns null if arrray <= 0
 * @param {Object} props
 * @constructor
 */
const MessageBox = props => {
  if (props.messages.messages.length > 0) {
    return (
      <div className="message-box">
        {props.messages.messages.map(message => {
          return (
            <div key={message._id}>
              <MessageCard message={message} user={props.user._id} />
            </div>
          );
        })}
      </div>
    );
  } else {
    return <div className="message-box" />;
  }
};

export default MessageBox;
