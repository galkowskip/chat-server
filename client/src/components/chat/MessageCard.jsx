import React from "react";

const owner = user => {
  if (user) return "right";
  else return "left";
};

const MessageCard = props => {
  return (
    <div className={"card " + owner(props.message.owner)}>
      <div className="card-content">
        <p>{props.message.message}</p>
        <p className="">{props.message.time}</p>
      </div>
    </div>
  );
};

export default MessageCard;
