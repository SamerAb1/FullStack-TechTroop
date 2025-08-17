import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__inner">
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/profile">Profile</NavLink>
      </div>
    </nav>
  );
}
