import { useState } from "react";
import "./App.css";
import MoviesPage from "./pages/MoviesPage";
import ActorsPage from "./pages/ActorsPage";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router";
import HomePage from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import ProtectedRoute from "./auth/ProtectedRoute";
import { AuthProvider } from "./auth/AuthProvider";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/movies"
            element={
              <ProtectedRoute>
                <MoviesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/actors"
            element={
              <ProtectedRoute>
                <ActorsPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
