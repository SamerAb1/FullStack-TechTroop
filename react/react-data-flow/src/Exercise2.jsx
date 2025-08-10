import { useState } from "react";
import List from "./List";
import Conversation from "./Conversation";

export default function Exercise2() {
  const data = {
    displayConversation: null,
    conversations: [
      {
        with: "Laura",
        convo: [
          { text: "Hi", sender: "self" },
          { text: "You there?", sender: "self" },
          { text: "Yeah, hi, what's up?", sender: "other" },
        ],
      },
      {
        with: "Dad",
        convo: [
          { text: "Have you finished your school work yet?", sender: "other" },
          { text: "Yes.", sender: "self" },
          { text: "What do you mean, yes?", sender: "other" },
          { text: "??", sender: "self" },
        ],
      },
      {
        with: "Shoobert",
        convo: [
          { text: "Shoobert!!!", sender: "self" },
          { text: "Dude!!!!!!!!", sender: "other" },
          { text: "Shooooooooo BERT!", sender: "self" },
          { text: "You're my best friend", sender: "other" },
          { text: "No, *you're* my best friend", sender: "self" },
        ],
      },
    ],
  };
  const [dataObj, setDataObj] = useState(data);

  function displayConvo(name) {
    const newData = { ...dataObj, displayConversation: name };
    setDataObj(newData);
  }
  function backToList() {
    const newData = { ...dataObj, displayConversation: null };
    setDataObj(newData);
  }

  return (
    <div>
      {dataObj.displayConversation === null ? (
        <List
          conversations={dataObj.conversations}
          onClickEvent={displayConvo}
        />
      ) : (
        <Conversation
          convo={
            dataObj.conversations.find(
              (c) => c.with === dataObj.displayConversation
            ).convo
          }
          sender={dataObj.displayConversation}
          onClickEvent={backToList}
        />
      )}
    </div>
  );
}
