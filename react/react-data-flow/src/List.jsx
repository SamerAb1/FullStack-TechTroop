import { useState } from "react";
import Contact from "./Contact";
export default function List(props) {
  function handleClick(name) {
    props.onClickEvent(name);
  }

  return (
    <ul>
      {props.conversations.map((c, idx) => (
        <Contact key={idx} contact={c.with} onClickEvent={handleClick} />
      ))}
    </ul>
  );
}
