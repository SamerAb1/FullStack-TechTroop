import React from "react";
import "./NotesList.css";

export default function NotesList({ notes, onDeleteNote, onOpenNote }) {
  function formatDate(date) {
    return new Date(date).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  }

  return (
    <div className="notes-grid">
      {notes.map((note, index) => (
        <div
          className="note-card"
          key={index}
          onClick={() => onOpenNote(note)} // Open modal on click
        >
          <div className="note-header">
            <small>{formatDate(note.date)}</small>
            <button
              className="delete-btn"
              onClick={(e) => {
                e.stopPropagation(); // prevent modal opening when deleting
                onDeleteNote(index);
              }}
            >
              ✕
            </button>
          </div>
          {note.title && <h4>{note.title}</h4>}
          <p>{note.text}</p>
        </div>
      ))}
    </div>
  );
}
