import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../data/supabase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [activeUser, setActiveUser] = useState(null);
  //   localStorage.activeUser ? JSON.parse(localStorage.activeUser) : null
  // );
  const navigate = useNavigate();

  // useEffect(() => {
  //   // Write to local Storage  on each change of active user
  //   if (localStorage.activeUser !== activeUser) {
  //     localStorage.setItem("activeUser", JSON.stringify(activeUser));
  //   }
  // }, [activeUser]);

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      console.log(data);
      console.log(error);
      // checking if there is an open session
      if (data && data.session && data.session.user) {
        setActiveUser(data.session.user);
      }
    };
  }, []);
  fetchSession();
  const handleLogin = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.log(error);
      return error;
    } else {
      setActiveUser(data.user);
      navigate("/movies");
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
      throw error;
    } else {
      setActiveUser(null);
      navigate("/");
    }

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
