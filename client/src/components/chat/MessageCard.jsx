import React from "react";

const owner = (owner, user) => {
  if(user === owner) {
    return 'right'
  } else {
    return 'left'
  }
};

/**
 * Message in a box
 * @constructor 
 * @param {User._id} owner Owner of message
 * @param {User._id} user Active user
 */
const MessageCard = props => {
  return (
    <div className={"card " + owner(props.message.owner, props.user)}>
      <div className="card-content">
        <p>{props.message.message}</p>
        <p className="">{props.message.time}</p>
      </div>
    </div>
  );
};

export default MessageCard;
