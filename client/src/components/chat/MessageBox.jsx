import React from "react";

import MessageCard from "./MessageCard";

const MessageBox = props => {
  if (props.messages.messages.length > 0) {
    return (
      <div className="message-box">
        {props.messages.messages.map(message => {
          return (
            <div key={message.id}>
              <MessageCard message={message} key={message.id} />
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
