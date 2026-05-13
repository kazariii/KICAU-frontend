import { useState, useEffect } from 'react';
import Icon from './components/Icon';
import Kimo from './components/Kimo';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import StoryPage from './pages/StoryPage';
import StoryComplete from './pages/StoryComplete';
import AchievementsPage from './pages/AchievementsPage';
import ChatbotPage from './pages/ChatbotPage';

export default function App() {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('kicau_user')); } catch { return null; }
  });
  const [route, setRoute] = useState("home");
  const [storyParams, setStoryParams] = useState(null);
  const [storyResult, setStoryResult] = useState(null);

  function login(u) {
    localStorage.setItem('kicau_user', JSON.stringify(u));
    setUser(u);
  }

  function logout() {
    localStorage.removeItem('kicau_user');
    setUser(null);
    setRoute("home");
  }

  function go(r) { setRoute(r); window.scrollTo({ top: 0, behavior: "smooth" }); }

  if (!user) return <div className="app-bg"><AuthPage onLogin={login}/></div>;

  return (
    <div className="app-bg">
      <div className="app-shell">
        <nav className="top-nav">
          <div className="top-nav-inner">
            <a href="#" className="brand" onClick={(e) => { e.preventDefault(); go("home"); }}>
              <span className="logo"><Icon name="sparkle-grad" size={22}/></span>
              KICAU
            </a>
            <div className="nav-tabs">
              <button className={`nav-tab ${route === "home" ? "is-active" : ""}`} onClick={() => go("home")}>
                <Icon name="home" size={16}/> Beranda
              </button>
              <button className={`nav-tab ${route === "achievements" ? "is-active" : ""}`} onClick={() => go("achievements")}>
                <Icon name="medal" size={16}/> Prestasi
              </button>
              <button className={`nav-tab ${route === "chatbot" ? "is-active" : ""}`} onClick={() => go("chatbot")}>
                <Icon name="chat" size={16}/> Kanca
              </button>
            </div>
            <div className="nav-spacer"/>
            <span className="xp-pill">
              <span className="dot"><Icon name="sparkle-grad" size={14}/></span>
              1,240 XP
            </span>
            <button className="avatar-btn" onClick={logout} aria-label="Keluar">
              <Kimo pose="peek" size={50}/>
            </button>
          </div>
        </nav>

        {route === "home" && (
          <HomePage user={user} onCreateStory={(p) => { setStoryParams(p); go("story"); }}/>
        )}
        {route === "story" && storyParams && (
          <StoryPage
            params={storyParams}
            token={user.token}
            onBack={() => go("home")}
            onComplete={(r) => { setStoryResult(r); go("complete"); }}
          />
        )}
        {route === "complete" && storyResult && (
          <StoryComplete result={storyResult} onHome={() => go("home")} onNew={() => go("home")}/>
        )}
        {route === "achievements" && <AchievementsPage user={user}/>}
        {route === "chatbot" && <ChatbotPage user={user} token={user.token}/>}
      </div>
    </div>
  );
}
