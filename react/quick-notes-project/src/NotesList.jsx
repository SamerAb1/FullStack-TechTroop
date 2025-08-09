import React, { useMemo } from "react";
import "./NotesList.css";

export default function NotesList({
  notes,
  onOpenNote,
  onDeleteNote,
  formatDate,
  categories,
}) {
  const colorByKey = useMemo(() => {
    const map = {};
    (categories || []).forEach((c) => (map[c.key] = c.color));
    return map;
  }, [categories]);

  return (
    <div className="notes-grid">
      {notes.map((n) => {
        const bg = colorByKey[n.category];
        const fg = bg ? "#111" : "#ddd";
        const muted = bg ? "#444" : "#a9a9a9";

        return (
          <div
            className="note-card"
            key={n.id}
            onClick={() => onOpenNote(n)}
            style={{ "--note-bg": bg, "--note-fg": fg, "--note-muted": muted }}
          >
            <div className="note-header">
              <small className="note-dates">
                {formatDate(n.createdAt)}
                {n.updatedAt && (
                  <span> • Updated {formatDate(n.updatedAt)}</span>
                )}
              </small>
              <button
                type="button"
                className="delete-btn"
                aria-label="Delete note"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteNote(n.id);
                }}
              >
                ✕
              </button>
            </div>

            {n.title && <h4 title={n.title}>{n.title}</h4>}
            <p>{n.text}</p>
          </div>
        );
      })}
    </div>
  );
}
