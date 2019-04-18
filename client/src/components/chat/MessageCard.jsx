import React from "react";

const owner = (owner, user) => {
  if(user === owner) {
    return 'right'
  } else {
    return 'left'
  }
};

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
