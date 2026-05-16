import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
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

  const tabClass = ({ isActive }) =>
    [
      "inline-flex items-center gap-2 rounded-full px-4 py-2.5 font-body text-sm font-bold transition",
      isActive
        ? "bg-brand-500 text-white shadow-[inset_0_-3px_0_rgba(0,0,0,0.1)]"
        : "text-ink-500 hover:bg-brand-500/10 hover:text-brand-700",
    ].join(" ");

  return (
    <div className="app-bg">
      <div className="relative z-1 flex min-h-screen flex-col">
        <nav className="sticky top-0 z-50 border-b border-line bg-cream-50/85 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl items-center gap-4 px-7 py-3.5">
            <NavLink
              to="/"
              end
              className="flex items-center gap-2.5 font-display text-[22px] font-bold text-brand-600"
            >
              <span className="grid h-9.5 w-9.5 place-items-center rounded-xl bg-linear-to-br from-brand-300 to-brand-600 shadow-soft">
                <Icon name="sparkle-grad" size={22} />
              </span>
              KICAU
            </NavLink>
            <div className="ml-3 flex gap-1.5">
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
            <div className="flex-1" />
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white py-1.5 pl-1.5 pr-3 text-[13px] font-extrabold text-ink-700 shadow-soft">
              <span className="grid h-6.5 w-6.5 place-items-center rounded-full bg-linear-to-br from-accent-yellow to-brand-500 text-sm text-ink-900">
                <Icon name="sparkle-grad" size={14} />
              </span>
              1,240 XP
            </span>
            <button
              onClick={handleLogout}
              aria-label="Keluar"
              className="grid h-10 w-10 place-items-center overflow-hidden rounded-full border-2 border-white bg-linear-to-br from-brand-300 to-brand-600 shadow-soft"
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
