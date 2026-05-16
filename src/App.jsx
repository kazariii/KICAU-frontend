import {
  Outlet,
  NavLink,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import Icon from "./components/Icon";
import Kimo from "./components/Kimo";
import { useAuthStore } from "./store/authStore";

export default function App() {
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  const tabClass = ({ isActive }) => `nav-tab ${isActive ? "is-active" : ""}`;

  return (
    <div className="app-bg">
      <div className="app-shell">
        <nav className="top-nav">
          <div className="top-nav-inner">
            <NavLink to="/" className="brand" end>
              <span className="logo">
                <Icon name="sparkle-grad" size={22} />
              </span>
              KICAU
            </NavLink>
            <div className="nav-tabs">
              <NavLink to="/" end className={tabClass}>
                <Icon name="home" size={16} /> Beranda
              </NavLink>
              <NavLink to="/achievements" className={tabClass}>
                <Icon name="medal" size={16} /> Prestasi
              </NavLink>
              <NavLink to="/chatbot" className={tabClass}>
                <Icon name="chat" size={16} /> Kanca
              </NavLink>
            </div>
            <div className="nav-spacer" />
            <span className="xp-pill">
              <span className="dot">
                <Icon name="sparkle-grad" size={14} />
              </span>
              1,240 XP
            </span>
            <button
              className="avatar-btn"
              onClick={handleLogout}
              aria-label="Keluar"
            >
              <Kimo pose="peek" size={50} />
            </button>
          </div>
        </nav>

        <Outlet />
      </div>
    </div>
  );
}
