import React, { useState } from "react";
import "./NoteInput.css";

export default function NoteInput() {
  const [myNote, setMyNote] = useState("");
  const [notes, setNotes] = useState([]);

  function formatDate(date) {
    return new Date(date).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  }

  function addNote() {
    if (myNote.trim() === "") {
      alert("Please enter a note!");
      return;
    }

    const newNote = {
      text: myNote,
      date: new Date().toISOString(),
    };

    setNotes([newNote, ...notes]);
    setMyNote("");
  }

  function deleteNote(index) {
    if (window.confirm("Are you sure you want to delete your note?")) {
      setNotes(notes.filter((_, i) => i !== index));
    }
  }

  return (
    <div className="input-container">
      <textarea
        id="note-input"
        value={myNote}
        onChange={(e) => setMyNote(e.target.value)}
        placeholder="Your note..."
      />
      <button id="add-btn" onClick={addNote}>
        Add
      </button>

      <div className="notes-grid">
        {notes.map((note, index) => (
          <div className="note-card" key={index}>
            <div className="note-header">
              <small>{formatDate(note.date)}</small>
              <button className="delete-btn" onClick={() => deleteNote(index)}>
                ✕
              </button>
            </div>
            <p>{note.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
