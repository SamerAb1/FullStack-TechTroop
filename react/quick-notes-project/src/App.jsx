import React, { useState } from "react";
import NoteInput from "./NoteInput";
import NotesList from "./NotesList";
import Modal from "react-modal";
import "./App.css";
Modal.setAppElement("#root"); // Accessibility requirement

export default function App() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);

  function addNote(note) {
    setNotes([note, ...notes]);
  }

  function deleteNote(index) {
    if (window.confirm("Are you sure you want to delete your note?")) {
      setNotes(notes.filter((_, i) => i !== index));
    }
  }

  function openNote(note) {
    setSelectedNote(note);
  }

  function closeModal() {
    setSelectedNote(null);
  }

  function formatDate(date) {
    return new Date(date).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  }

  return (
    <div>
      <NoteInput onAddNote={addNote} />
      <NotesList
        notes={notes}
        onDeleteNote={deleteNote}
        onOpenNote={openNote}
      />

      <Modal
        isOpen={!!selectedNote}
        onRequestClose={closeModal}
        contentLabel="View Note"
      >
        {selectedNote && (
          <div>
            <div className="modal-header">
              <small className="modal-date">
                {formatDate(selectedNote.date)}
              </small>
              <button className="modal-close-btn" onClick={closeModal}>
                ✕
              </button>
            </div>
            {selectedNote.title && (
              <h4 className="modal-title">{selectedNote.title}</h4>
            )}
            <p className="modal-text">{selectedNote.text}</p>
          </div>
        )}
      </Modal>
    </div>
  );
}
