import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Sidebar = ({ onClose }) => {
  const location = useLocation();
  const { user, loading } = useAuth();
  const role = user?.role || 'citizen';

  // Don't render role-specific items until auth status is clear
  if (loading) {
    return (
      <div className="w-full h-full bg-[#f5f5f7] flex items-center justify-center p-8">
        <div className="animate-spin h-5 w-5 border-2 border-gray-300 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  const citizenItems = [
    { icon: "home", label: "Overview", path: "/" },
    { icon: "plus", label: "Report Issue", path: "/report" },
    { icon: "grid", label: "Exploration", path: "/dashboard" },
    { icon: "check", label: "My Reports", path: "/my-reports" },
    { icon: "heart", label: "Area Health", path: "/area-health" },
  ];

  const authorityItems = [
    { icon: "home", label: "Admin Console", path: "/authority/dashboard" },
    { icon: "layers", label: "Issue Pulse", path: "/authority/issues" },
    { icon: "chart", label: "Analytics", path: "/authority/analytics" },
    { icon: "users", label: "Team Flow", path: "/authority/teams" },
    { icon: "grid", label: "Global Map", path: "/map" },
  ];

  const menuItems = role === 'authority' ? authorityItems : citizenItems;

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
      layers: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h19.5m-19.5-9h19.5m-19.5 4.5h19.5m-19.5 4.5h19.5" />
        </svg>
      ),
      chart: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>
      ),
      heart: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
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
        <div className="px-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">
          {role === 'authority' ? 'Management' : 'Activity'}
        </div>
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

      {/* Account Info - Role Based Card */}
      <div className="mt-auto px-2">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200">
          {role === 'authority' ? (
            <>
              <h3 className="text-[13px] font-bold text-gray-900 mb-1">System Ops</h3>
              <p className="text-[11px] text-gray-400 mb-3 leading-tight">Monitor regional throughput and active technician load.</p>
              <div className="h-1 bg-gray-100 rounded-full overflow-hidden mb-3">
                <div className="w-1/4 h-full bg-red-500"></div>
              </div>
              <Link to="/authority/issues" className="block text-center py-2 bg-gray-900 !text-white text-[12px] font-bold rounded-full hover:bg-black transition-all">
                Urgent Queue
              </Link>
            </>
          ) : (
            <>
              <h3 className="text-[13px] font-bold text-gray-900 mb-1">Impact Stats</h3>
              <p className="text-[11px] text-gray-400 mb-3 leading-tight">Your contributions are helping the planet.</p>
              <div className="h-1 bg-gray-100 rounded-full overflow-hidden mb-3">
                <div className="w-3/4 h-full bg-water-600"></div>
              </div>
              <Link to="/report" className="block text-center py-2 bg-gray-900 !text-white text-[12px] font-bold rounded-full hover:bg-black transition-all">
                New Submission
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
