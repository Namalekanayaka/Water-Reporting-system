import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
    const { isAuthenticated, user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();

    return (
        <nav className="bg-white/5 backdrop-blur-xl border-b border-white/10 shadow-glass sticky top-0 z-30">
            <div className="max-w-full px-4 md:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="md:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                    >
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="w-9 h-9 bg-water-500 rounded-xl flex items-center justify-center">
                            <span className="text-white font-bold text-lg">💧</span>
                        </div>
                        <span className="hidden md:inline text-lg font-bold text-white">
                            Water Report
                        </span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden lg:flex items-center space-x-1">
                        <Link to="/" className="px-4 py-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors font-medium">
                            Home
                        </Link>
                        <Link to="/dashboard" className="px-4 py-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors font-medium">
                            Dashboard
                        </Link>
                        <Link to="/report" className="px-4 py-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors font-medium">
                            Report Issue
                        </Link>
                    </div>

                    {/* Right Side - Theme & Auth */}
                    <div className="flex items-center space-x-3">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                        >
                            {theme === 'light' ? (
                                <svg className="w-5 h-5 text-slate-700" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                                </svg>
                            ) : (
                                <svg className="w-5 h-5 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l-2.121-2.121a1 1 0 00-1.414 1.414l2.121 2.121a1 1 0 001.414-1.414zM2.05 6.464l2.121 2.121a1 1 0 001.414-1.414L3.464 5.05a1 1 0 00-1.414 1.414zM17.95 6.464l-2.121 2.121a1 1 0 001.414 1.414l2.121-2.121a1 1 0 00-1.414-1.414zM2.05 13.536l2.121-2.121a1 1 0 00-1.414-1.414L.636 12.122a1 1 0 001.414 1.414zM15 12a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm4-4a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM1 8a1 1 0 011-1h1a1 1 0 110 2H2a1 1 0 01-1-1zm9-5a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1z" clipRule="evenodd"></path>
                                </svg>
                            )}
                        </button>

                        {/* Auth Buttons */}
                        {isAuthenticated ? (
                            <div className="flex items-center space-x-3">
                                <span className="hidden sm:inline text-white font-medium">
                                    {user?.name || 'User'}
                                </span>
                                <button
                                    onClick={logout}
                                    className="px-4 py-2 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors font-medium border border-red-200 dark:border-red-800"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-2">
                                <Link
                                    to="/login"
                                    className="px-4 py-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors font-medium"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="px-4 py-2 bg-water-600/40 backdrop-blur-sm hover:bg-water-600/60 text-white rounded-lg transition-colors font-medium border border-water-500/30"
                                >
                                    Sign Up
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

