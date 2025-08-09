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
      {notes.map((n) => (
        <div className="note-card" key={n.id} onClick={() => onOpenNote(n)}>
          <div className="note-header">
            <small className="note-dates">
              {formatDate(n.createdAt)}
              {n.updatedAt && <span> • Updated {formatDate(n.updatedAt)}</span>}
            </small>

            {/* IMPORTANT: type="button" + stopPropagation */}
            <button
              type="button"
              className="delete-btn"
              aria-label="Delete note"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteNote?.(n.id);
              }}
            >
              ✕
            </button>
          </div>

          {n.title && <h4 title={n.title}>{n.title}</h4>}
          <p>{n.text}</p>
        </div>
      ))}
    </div>
  );
}
