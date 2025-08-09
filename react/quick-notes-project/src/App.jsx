import React, { useState } from "react";
import Modal from "react-modal";
import NoteForm from "./NoteForm";
import NotesList from "./NotesList";
import "./Modal.css";
import "./NoteForm.css";
import "./NotesList.css";
import "./App.css";
Modal.setAppElement("#root");

const fmt = (d) =>
  new Date(d).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

export default function App() {
  const [notes, setNotes] = useState([]);
  const [selected, setSelected] = useState(null); // note or null

  const addNote = ({ title, text }) => {
    const now = Date.now();
    setNotes((prev) => [
      {
        id: crypto?.randomUUID?.() ?? String(now) + Math.random(),
        title: title?.trim() ?? "",
        text,
        createdAt: now,
        updatedAt: null,
      },
      ...prev,
    ]);
  };

  const deleteNote = (id) => {
    if (window.confirm("Are you sure you want to delete your note?")) {
      setNotes((prev) => prev.filter((n) => n.id !== id));
    }
  };

  const openNote = (note) => setSelected(note);
  const closeModal = () => setSelected(null);

  const updateNote = ({ title, text }) => {
    const now = Date.now();
    setNotes((prev) =>
      prev.map((n) =>
        n.id === selected.id
          ? { ...n, title: title.trim(), text, updatedAt: now }
          : n
      )
    );
    closeModal();
  };

  return (
    <div style={{ display: "grid", placeItems: "center", gap: 16 }}>
      {/* Add new */}
      <NoteForm onSubmit={addNote} cta="Add" clearOnSubmit />

      {/* List */}
      <NotesList
        notes={notes}
        onOpenNote={openNote}
        onDeleteNote={deleteNote}
        formatDate={fmt}
      />

      {/* Edit modal */}
      <Modal
        isOpen={!!selected}
        onRequestClose={closeModal}
        contentLabel="Edit Note"
      >
        {selected && (
          <>
            <div className="modal-header">
              <small className="modal-date">
                Created: {fmt(selected.createdAt)}
                {selected.updatedAt && (
                  <> • Updated: {fmt(selected.updatedAt)}</>
                )}
              </small>
              <button className="modal-close-btn" onClick={closeModal}>
                ✕
              </button>
            </div>

            <NoteForm
              initial={{ title: selected.title, text: selected.text }}
              onSubmit={updateNote}
              cta="Update"
              clearOnSubmit={false}
            />
          </>
        )}
      </Modal>
    </div>
  );
}
