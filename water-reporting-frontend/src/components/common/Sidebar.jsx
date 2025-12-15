import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation();

    const menuItems = [
        { icon: '📊', label: 'Dashboard', path: '/dashboard' },
        { icon: '📝', label: 'Reports', path: '/my-reports' },
        { icon: '🗺️', label: 'Map View', path: '/map' },
        { icon: '📈', label: 'Analytics', path: '/statistics' },
        { icon: '⚙️', label: 'Settings', path: '/settings' },
    ];

    return (
        <div className="w-64 h-screen bg-white border-r border-gray-200 fixed left-0 top-0 flex flex-col">
            {/* Logo */}
            <div className="p-6 border-b border-gray-200">
                <Link to="/" className="flex items-center space-x-2">
                    <div className="w-9 h-9 bg-emerald-600 rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold text-lg">💧</span>
                    </div>
                    <span className="text-lg font-bold text-gray-800">
                        Water Report
                    </span>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4">
                <ul className="space-y-1">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl
                    transition-all duration-200
                    ${isActive
                                            ? 'bg-emerald-50 text-emerald-700 font-semibold'
                                            : 'text-gray-600 hover:bg-gray-50'
                                        }
                  `}
                                >
                                    <span className="text-xl">{item.icon}</span>
                                    <span className="text-sm">{item.label}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* User Profile */}
            <div className="p-4 border-t border-gray-200">
                <div className="flex items-center gap-3 px-4 py-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                        <span className="text-emerald-700 font-semibold">JD</span>
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-800">John Doe</p>
                        <p className="text-xs text-gray-500">Citizen</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
