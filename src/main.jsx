import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { RequireAuth, GuestOnly } from "./routes/guards.jsx";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import StoryPage from "./pages/StoryPage";
import StoryComplete from "./pages/StoryComplete";
import AchievementsPage from "./pages/AchievementsPage";
import ChatbotPage from "./pages/ChatbotPage";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <GuestOnly>
              <AuthPage />
            </GuestOnly>
          }
        />
        <Route
          element={
            <RequireAuth>
              <App />
            </RequireAuth>
          }
        >
          <Route path="/" element={<HomePage />} />
          <Route path="/story" element={<StoryPage />} />
          <Route path="/story/complete" element={<StoryComplete />} />
          <Route path="/achievements" element={<AchievementsPage />} />
          <Route path="/chatbot" element={<ChatbotPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
