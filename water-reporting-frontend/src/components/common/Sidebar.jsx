import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ onClose }) => {
  const location = useLocation();

  const menuGroups = [
    {
      title: "MENU",
      items: [
        { icon: "grid", label: "Dashboard", path: "/" },
        { icon: "check-square", label: "My Reports", path: "/my-reports" },
        { icon: "bar-chart-2", label: "Analytics", path: "/statistics" },
        { icon: "map", label: "Map", path: "/map" },
        { icon: "plus-circle", label: "Report Issue", path: "/report" },
      ],
    },
    {
      title: "AUTHORITY",
      items: [
        { icon: "briefcase", label: "Dashboard", path: "/authority/dashboard" },
        { icon: "alert-circle", label: "Issues", path: "/authority/issues" },
        { icon: "users", label: "Team", path: "/authority/team-management" },
      ],
    },
    {
      title: "GENERAL",
      items: [
        { icon: "settings", label: "Settings", path: "/settings" },
        { icon: "help-circle", label: "Help", path: "/help" },
      ],
    },
  ];

  const Icon = ({ name }) => {
    const iconProps = {
      width: "20",
      height: "20",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    };
    const iconMap = {
      grid: (
        <svg {...iconProps}>
          <rect x="3" y="3" width="7" height="7"></rect>
          <rect x="14" y="3" width="7" height="7"></rect>
          <rect x="14" y="14" width="7" height="7"></rect>
          <rect x="3" y="14" width="7" height="7"></rect>
        </svg>
      ),
      "check-square": (
        <svg {...iconProps}>
          <polyline points="9 11 12 14 22 4"></polyline>
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
        </svg>
      ),
      "bar-chart-2": (
        <svg {...iconProps}>
          <line x1="18" y1="20" x2="18" y2="10"></line>
          <line x1="12" y1="20" x2="12" y2="4"></line>
          <line x1="6" y1="20" x2="6" y2="14"></line>
        </svg>
      ),
      map: (
        <svg {...iconProps}>
          <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
          <polyline points="8 2 8 18"></polyline>
          <polyline points="16 6 16 22"></polyline>
        </svg>
      ),
      "plus-circle": (
        <svg {...iconProps}>
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="16"></line>
          <line x1="8" y1="12" x2="16" y2="12"></line>
        </svg>
      ),
      briefcase: (
        <svg {...iconProps}>
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
          <path d="M16 7v-2a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"></path>
        </svg>
      ),
      "alert-circle": (
        <svg {...iconProps}>
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
      ),
      users: (
        <svg {...iconProps}>
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
      settings: (
        <svg {...iconProps}>
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
      ),
      "help-circle": (
        <svg {...iconProps}>
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      ),
    };
    return iconMap[name] || null;
  };

  return (
    <div className="w-full h-full bg-white/10 backdrop-blur-xl flex flex-col p-6 border-r border-white/10 shadow-glass">
      {/* Brand */}
      <div className="flex items-center justify-between gap-3 mb-10 px-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-water-500 flex items-center justify-center">
            <span className="text-white font-bold">💧</span>
          </div>
          <h1 className="text-lg font-bold text-white">
            WaterSys
          </h1>
        </div>
        <button
          onClick={onClose}
          className="md:hidden p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
        >
          <svg
            className="w-5 h-5 text-slate-600 dark:text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Menu */}
      <div className="flex-1 overflow-y-auto">
        {menuGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="mb-8">
            <h3 className="text-xs font-semibold text-slate-400 mb-4 px-2 tracking-wider uppercase">
              {group.title}
            </h3>
            <ul className="space-y-1">
              {group.items.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={onClose}
                      className={`
                                                flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-all duration-200
                                                ${isActive
                          ? "text-water-600 dark:text-water-400 bg-water-50 dark:bg-water-900/20 shadow-sm ring-1 ring-water-200 dark:ring-water-800"
                          : "text-slate-600 dark:text-slate-400 hover:text-water-600 dark:hover:text-water-400 hover:bg-water-50 dark:hover:bg-slate-700"
                        }
                                            `}
                    >
                      <span
                        className={
                          isActive ? "text-water-300" : ""
                        }
                      >
                        <Icon name={item.icon} />
                      </span>
                      <span>{item.label}</span>
                      {isActive && (
                        <div className="ml-auto w-1.5 h-1.5 bg-water-300 rounded-full"></div>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* App Download Card */}
      <div className="bg-water-600/30 backdrop-blur-sm rounded-xl p-5 text-white mt-4 relative overflow-hidden border border-water-500/20">
        <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-bl-2xl"></div>
        <div className="relative z-10">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mb-3">
            📱
          </div>
          <h4 className="font-semibold text-sm mb-1">Download App</h4>
          <p className="text-xs text-water-100 mb-3">Report issues anywhere</p>
          <button className="w-full py-2 bg-white/20 backdrop-blur-sm text-xs font-semibold rounded-lg hover:bg-white/30 transition-colors border border-white/20">
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
