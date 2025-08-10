import { useState } from "react";
import Contact from "./Contact";
export default function List(props) {
  console.log(props);
  function handleClick(name) {
    props.onClickEvent(name);
  }

  return (
    <ul>
      {props.conversations.map((c, idx) => (
        <Contact contact={c.with} onClickEvent={handleClick} />
      ))}
    </ul>
  );
}
