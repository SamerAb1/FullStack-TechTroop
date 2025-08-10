import { useState } from "react";

export default function Contact(props) {
  function handleClick(name) {
    props.onClickEvent(name);
  }
  return <li onClick={() => handleClick(props.contact)}>{props.contact}</li>;
}
