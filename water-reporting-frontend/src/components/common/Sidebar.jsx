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
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      ),
      plus: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      ),
      grid: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25a2.25 2.25 0 01-2.25-2.25v-2.25z" />
        </svg>
      ),
      check: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      users: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      ),
    };
    return icons[name] || null;
  };

  return (
    <div className="w-full h-full bg-[#f5f5f7] flex flex-col px-4 py-8 pointer-events-auto">
      {/* Sidebar Profile Circle - Classic Apple Settings Look */}
      <div className="flex items-center gap-3 mb-10 px-4">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-200 text-xl">
          <img src="/logo.png" className="w-7 h-7 object-contain opacity-80" />
        </div>
        <div>
          <h2 className="text-[15px] font-bold text-gray-900 leading-tight">WaterSys</h2>
          <p className="text-[12px] text-gray-400 font-medium">Standard Edition</p>
        </div>
      </div>

      <nav className="flex-1">
        <div className="px-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">Activity</div>
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={onClose}
                  className={`
                    flex items-center gap-3 px-4 py-2.5 rounded-xl text-[14px] font-medium transition-colors
                    ${isActive
                      ? "bg-water-600 !text-white"
                      : "text-gray-800 hover:bg-gray-200/50"}
                  `}
                >
                  <Icon name={item.icon} />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Account Info - Rounded Minimalist Card */}
      <div className="mt-auto px-2">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200">
          <h3 className="text-[13px] font-bold text-gray-900 mb-1">Impact Stats</h3>
          <p className="text-[11px] text-gray-400 mb-3 leading-tight">Your contributions are helping the planet.</p>
          <div className="h-1 bg-gray-100 rounded-full overflow-hidden mb-3">
            <div className="w-3/4 h-full bg-water-600"></div>
          </div>
          <Link to="/report" className="block text-center py-2 bg-gray-900 !text-white text-[12px] font-bold rounded-full hover:bg-black transition-all">
            New Submission
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
