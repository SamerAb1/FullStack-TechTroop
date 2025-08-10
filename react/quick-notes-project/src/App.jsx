import React, { useEffect, useMemo, useState } from "react";
import Modal from "react-modal";
import NoteForm from "./NoteForm";
import NotesList from "./NotesList";
import "./App.css";
import "./NoteForm.css";
import "./NotesList.css";
import "./Modal.css";

Modal.setAppElement("#root");

const fmt = (d) =>
  new Date(d).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

// Categories shown in toolbar + form select
const CATEGORIES = [
  { key: "personal", label: "Personal", color: "#FFE9B5" },
  { key: "work", label: "Work", color: "#CFE7FF" },
  { key: "study", label: "Study", color: "#D8FFE0" },
  { key: "idea", label: "Idea", color: "#FFE0F0" },
];

export default function App() {
  const [notes, setNotes] = useState([]);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("all");

  // localStorage load/save
  useEffect(() => {
    const raw = localStorage.getItem("notes");
    if (raw) {
      try {
        setNotes(JSON.parse(raw));
      } catch {}
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = ({ title, text, category }) => {
    const now = Date.now();
    setNotes((prev) => [
      {
        id: crypto?.randomUUID?.() ?? String(now) + Math.random(),
        title: title?.trim() ?? "",
        text,
        category,
        createdAt: now,
        updatedAt: null,
      },
      ...prev,
    ]);
  };
  const deleteNote = (id) => {
    if (confirm("Are you sure you want to delete your note?")) {
      setNotes((prev) => prev.filter((n) => n.id !== id));
    }
  };
  const openNote = (note) => setSelected(note);
  const closeModal = () => setSelected(null);
  const updateNote = ({ title, text, category }) => {
    const now = Date.now();
    setNotes((prev) =>
      prev.map((n) =>
        n.id === selected.id
          ? { ...n, title: title.trim(), text, category, updatedAt: now }
          : n
      )
    );
    closeModal();
  };

  // search + category filter
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return notes.filter((n) => {
      const okCat = catFilter === "all" || n.category === catFilter;
      const okText =
        !q ||
        (n.title || "").toLowerCase().includes(q) ||
        (n.text || "").toLowerCase().includes(q);
      return okCat && okText;
    });
  }, [notes, search, catFilter]);

  return (
    <div className="app-wrap">
      <h1>My-Notes</h1>

      {/* TOOLBAR — search + category chips */}
      <div className="toolbar">
        <input
          className="search-input"
          type="text"
          placeholder="Search title or text…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="cat-filters">
          <button
            className={`chip ${catFilter === "all" ? "active" : ""}`}
            onClick={() => setCatFilter("all")}
          >
            All
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              className={`chip ${catFilter === c.key ? "active" : ""}`}
              onClick={() => setCatFilter(c.key)}
              style={{
                backgroundColor: catFilter === c.key ? c.color : undefined,
              }}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Add new */}
      <NoteForm
        onSubmit={addNote}
        cta="Add"
        clearOnSubmit
        categories={CATEGORIES}
      />

      {/* List */}
      <NotesList
        notes={filtered}
        onOpenNote={openNote}
        onDeleteNote={deleteNote}
        formatDate={fmt}
        categories={CATEGORIES}
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
              initial={{
                title: selected.title,
                text: selected.text,
                category: selected.category || CATEGORIES[0].key,
              }}
              onSubmit={updateNote}
              cta="Update"
              clearOnSubmit={false}
              categories={CATEGORIES}
            />
          </>
        )}
      </Modal>
    </div>
  );
}
