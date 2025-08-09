import React from "react";
import "./NotesList.css";

export default function NotesList({
  notes,
  onOpenNote,
  onDeleteNote,
  formatDate,
}) {
  return (
    <div className="notes-grid">
      {notes.map((n) => (
        <div className="note-card" key={n.id} onClick={() => onOpenNote(n)}>
          <div className="note-header">
            <small className="note-dates">
              {formatDate(n.createdAt)}
              {n.updatedAt && <span> • Updated {formatDate(n.updatedAt)}</span>}
            </small>
            <button
              type="button"
              className="delete-btn"
              aria-label="Delete note"
              onClick={(e) => {
                e.stopPropagation(); // don't trigger open modal
                onDeleteNote(n.id);
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
