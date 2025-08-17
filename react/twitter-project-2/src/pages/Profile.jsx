import { useState } from "react";
import { useUser } from "../context/UserContext";

export default function Profile() {
  const { userName, setUserName } = useUser();
  const [name, setName] = useState(userName);
  const [saved, setSaved] = useState(false);

  function onSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    setUserName(name.trim()); // saved to localStorage via context
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  return (
    <section className="profile">
      <h2 className="profile__title">Profile</h2>
      <form onSubmit={onSubmit} className="profile__form">
        <label className="label">User Name</label>
        <input
          className="input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
        />
        <div className="profile__actions">
          <button
            className="btn btn--primary"
            type="submit"
            disabled={!name.trim() || name === userName}
          >
            Save
          </button>
          {saved && <span className="saved-msg">Saved ✓</span>}
        </div>
      </form>
    </section>
  );
}
