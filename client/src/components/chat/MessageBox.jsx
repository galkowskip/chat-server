import React from "react";

import MessageCard from "./MessageCard";

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
    return (
      <div className="message-box">
        <p>Empty</p>
      </div>
    );
  }
};

export default MessageBox;