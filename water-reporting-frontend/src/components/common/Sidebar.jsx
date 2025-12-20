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
    <div className="w-full h-full bg-md-surface flex flex-col px-3 py-6 pointer-events-auto">
      {/* Drawer Header - M3 Logo/Title Style */}
      <div className="flex items-center gap-4 mb-8 px-4 py-2">
        <div className="w-10 h-10 bg-md-primary-container text-md-on-primary-container rounded-[12px] flex items-center justify-center shadow-sm">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
        <div>
          <h2 className="text-[14px] font-black text-md-on-surface uppercase tracking-widest">WaterSys</h2>
          <p className="text-[11px] text-md-on-surface-variant font-medium">Infrastructure v1.2</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto">
        <div className="px-4 text-[12px] font-bold text-md-on-surface-variant uppercase tracking-wider mb-2">
          {role === 'authority' ? 'Management Console' : 'Citizen Workspace'}
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
                    group relative flex items-center gap-4 px-4 py-3 rounded-full text-[14px] font-bold transition-all
                    ${isActive
                      ? "bg-md-primary-container text-md-on-primary-container"
                      : "text-md-on-surface-variant hover:bg-md-surface-variant hover:text-md-on-surface"}
                  `}
                >
                  <div className={`
                    p-1 transition-transform group-active:scale-90
                    ${isActive ? "scale-110" : ""}
                  `}>
                    <Icon name={item.icon} />
                  </div>
                  <span className="flex-1">{item.label}</span>
                  {isActive && (
                    <div className="w-1.5 h-1.5 rounded-full bg-md-primary animate-pulse"></div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* M3 Account/Impact Card */}
      <div className="mt-auto px-1 pt-6">
        <div className="bg-md-surface-variant/40 rounded-[28px] p-5 border border-md-outline/5 overflow-hidden relative">
          <div className="relative z-10">
            <h3 className="text-[13px] font-black text-md-on-surface-variant uppercase tracking-widest mb-1">
              {role === 'authority' ? 'System Load' : 'Citizen Impact'}
            </h3>
            <p className="text-[12px] text-md-on-surface-variant/70 mb-4 leading-snug">
              {role === 'authority' ? 'Operational efficiency at 92%' : 'Helping save 850L daily'}
            </p>
            <div className="h-1.5 bg-md-surface-variant rounded-full overflow-hidden mb-4">
              <div className={`h-full ${role === 'authority' ? 'bg-md-error' : 'bg-md-primary'} transition-all`} style={{ width: role === 'authority' ? '25%' : '75%' }}></div>
            </div>
            <Link
              to={role === 'authority' ? "/authority/issues" : "/report"}
              className="flex items-center justify-center w-full py-3 bg-md-primary-container text-md-on-primary-container text-[12px] font-bold rounded-xl hover:bg-md-primary hover:text-white transition-all active:scale-95 shadow-sm"
            >
              {role === 'authority' ? 'View Queue' : 'Quick Report'}
            </Link>
          </div>
          <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-md-primary/5 rounded-full blur-2xl"></div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
