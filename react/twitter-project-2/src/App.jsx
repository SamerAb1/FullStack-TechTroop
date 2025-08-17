import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <div className="page">
      <Navbar /> {/* stick to top */}
      <header className="page__header">
        <h1 className="brand">Tweeter 2.0</h1>
      </header>
      <main className="column">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </div>
  );
}
