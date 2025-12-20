import React, { useState } from "react";
import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/common/Navbar";

const MainLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-md-surface text-md-on-surface">
      {/* Scrim/Overlay for Mobile Drawer */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden backdrop-blur-none transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Navigation Drawer */}
      <div
        className={`
                fixed inset-y-0 left-0 z-50 w-[280px] transform transition-transform duration-300 md:translate-x-0
                bg-md-surface-variant/20 border-r border-md-outline/10
                ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
            `}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 ml-0 md:ml-[280px] min-w-0 flex flex-col w-full bg-md-surface">
        {/* Top App Bar */}
        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Page Content */}
        <main className="flex-grow p-4 md:p-6 lg:p-8 animate-in fade-in duration-500">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
