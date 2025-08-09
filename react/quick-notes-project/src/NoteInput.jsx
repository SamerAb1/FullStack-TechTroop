import React, { useState } from "react";
import "./NoteInput.css";

export default function NoteInput({ onAddNote }) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  function handleAdd() {
    if (text.trim() === "") {
      alert("Please enter note text!");
      return;
    }

    onAddNote({
      title: title.trim(),
      text,
      date: new Date().toISOString(),
    });

    setTitle("");
    setText("");
  }

  return (
    <div className="input-container">
      <input
        id="note-title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title (optional)"
      />
      <textarea
        id="note-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Your note..."
      />
      <button id="add-btn" onClick={handleAdd}>
        Add
      </button>
    </div>
  );
}
