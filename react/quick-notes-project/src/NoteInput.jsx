import React, { useState } from "react";
import "./NoteInput.css";

export default function NoteInput() {
  const [myNote, setMyNote] = useState("");
  const [notes, setNotes] = useState([]);

  function addNote() {
    if (myNote.trim() === "") {
      alert("Please enter a note!");
      return;
    }

    const newNote = {
      text: myNote,
      date: new Date().toLocaleString(),
    };

    setNotes([newNote, ...notes]);
    setMyNote("");
  }

  return (
    <div className="input-container">
      <textarea
        id="note-input"
        value={myNote}
        onChange={(e) => setMyNote(e.target.value)}
        placeholder="Write your note..."
      />
      <button id="add-btn" onClick={addNote}>
        Add
      </button>

      <div className="notes-grid">
        {notes.map((note, index) => (
          <div className="note-card" key={index}>
            <p>{note.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
