import { useState } from "react";

export default function Conversation(props) {
  function handleClick() {
    props.onClickEvent();
  }

  return (
    <div>
      {props.convo.map((c, idx) => (
        <div key={idx}>
          {c.sender === "self" ? (
            <span className="sender">Me</span>
          ) : (
            <span className="sender">{props.sender}</span>
          )}
          : {c.text}
        </div>
      ))}
      <button onClick={handleClick}>Back</button>
    </div>
  );
}
