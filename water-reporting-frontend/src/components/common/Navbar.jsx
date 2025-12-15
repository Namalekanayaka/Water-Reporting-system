import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();

    return (
        <nav className="bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-[1400px] mx-auto px-6">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="w-9 h-9 bg-emerald-600 rounded-xl flex items-center justify-center">
                            <span className="text-white font-bold text-lg">💧</span>
                        </div>
                        <span className="text-lg font-bold text-gray-800">
                            Water Report
                        </span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-1">
                        <Link to="/" className="px-4 py-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors font-medium">
                            Home
                        </Link>
                        <Link to="/dashboard" className="px-4 py-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors font-medium">
                            Dashboard
                        </Link>
                        <Link to="/map" className="px-4 py-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors font-medium">
                            Map
                        </Link>
                        <Link to="/report" className="px-4 py-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors font-medium">
                            Report Issue
                        </Link>

                        {/* Auth Buttons */}
                        {isAuthenticated ? (
                            <div className="flex items-center space-x-3 ml-4">
                                <span className="text-gray-700 font-medium">
                                    {user?.name || 'User'}
                                </span>
                                <button
                                    onClick={logout}
                                    className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium border border-red-200"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-2 ml-4">
                                <Link
                                    to="/login"
                                    className="px-4 py-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors font-medium"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
