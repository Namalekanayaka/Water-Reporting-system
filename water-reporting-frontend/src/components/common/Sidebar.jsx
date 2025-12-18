import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ onClose }) => {
  const location = useLocation();

  const menuItems = [
    { icon: "home", label: "Home", path: "/" },
    { icon: "plus", label: "Report Issue", path: "/report" },
    { icon: "grid", label: "Dashboard", path: "/dashboard" },
    { icon: "check", label: "My Reports", path: "/my-reports" },
    { icon: "users", label: "Area Health", path: "/area-health" },
  ];

  const Icon = ({ name }) => {
    const icons = {
      home: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      ),
      plus: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      ),
      grid: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <rect x="3" y="3" width="7" height="7"></rect>
          <rect x="14" y="3" width="7" height="7"></rect>
          <rect x="14" y="14" width="7" height="7"></rect>
          <rect x="3" y="14" width="7" height="7"></rect>
        </svg>
      ),
      check: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="9 11 12 14 22 4"></polyline>
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
        </svg>
      ),
      users: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
    };
    return icons[name] || null;
  };

  return (
    <div className="w-full h-full bg-white flex flex-col p-6 overflow-y-auto">
      {/* Sidebar Logo Section */}
      <div className="flex items-center gap-4 mb-10 px-2">
        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-xl shadow-water-100 border border-gray-100 transform -rotate-3 overflow-hidden">
          <img src="/logo.png" alt="WRS Logo" className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col">
          <h1 className="text-xl font-black text-gray-900 tracking-tight leading-none uppercase">WaterSys</h1>
          <span className="text-[9px] font-bold text-gray-400 tracking-[0.3em] mt-1 uppercase">Platform</span>
        </div>
      </div>

      {/* Primary Navigation */}
      <nav className="flex-1">
        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4 px-4">Menu</div>
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={onClose}
                  className={`
                    flex items-center justify-between px-4 py-4 rounded-2xl text-sm font-bold transition-all
                    ${isActive
                      ? "bg-water-600 !text-white shadow-lg shadow-water-200"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"}
                  `}
                >
                  <div className="flex items-center gap-4">
                    <Icon name={item.icon} />
                    <span>{item.label}</span>
                  </div>
                  {item.hasAdd && !isActive && (
                    <div className="w-6 h-6 bg-gray-100 flex items-center justify-center rounded-lg">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="3">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                    </div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Profile / Quick Info */}
      <div className="mt-auto pt-8 border-t border-gray-100">
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 text-white relative overflow-hidden group">
          <div className="relative z-10">
            <div className="text-[10px] font-bold text-water-400 uppercase tracking-widest mb-1">Impact</div>
            <div className="text-xl font-black mb-4">You've saved 450L</div>
            <Link to="/report" className="flex items-center justify-center gap-2 py-3 bg-white !text-black rounded-xl font-black text-xs hover:bg-gray-100 transition-all uppercase tracking-wider shadow-xl">
              New Report
            </Link>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-water-500/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-2xl group-hover:bg-water-500/20 transition-all"></div>
        </div>

        <button className="w-full flex items-center gap-4 px-5 py-4 mt-4 text-sm font-bold text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          <span>Logout Access</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
