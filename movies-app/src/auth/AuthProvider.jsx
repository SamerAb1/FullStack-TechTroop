import { createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { useState } from "react";
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [activeUser, setActiveUser] = useState(
    JSON.parse(localStorage.activeUser)
  );
  const navigate = useNavigate();

  useEffect(() => {
    //Write to localStorage on each change of active user
    if (localStorage.activeUser !== activeUser) {
      localStorage.setItem("activeUser", JSON.stringify(activeUser));
    }
  }, [activeUser]);

  const handleLogin = (email, password) => {
    setTimeout(() => {
      setActiveUser("john");
      navigate("/movies");
    }, 1000);
  };

  const handleLogout = () => {
    setActiveUser(null);
    navigate("/");
  };

  return (
    <AuthContext
      value={{ activeUser, onLogin: handleLogin, onLogout: handleLogout }}
    >
      {children}
    </AuthContext>
  );
}

export const useAuth = () => useContext(AuthContext);
