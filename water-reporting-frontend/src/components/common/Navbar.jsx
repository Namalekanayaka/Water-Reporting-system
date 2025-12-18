import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
    const { isAuthenticated, user, logout } = useAuth();

    return (
        <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40 transition-all">
            <div className="max-w-full px-4 md:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="flex items-center gap-4">
                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="md:hidden p-2.5 hover:bg-gray-50 rounded-xl transition-colors text-gray-600 focus:outline-none focus:ring-2 focus:ring-water-500/20"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>

                    {/* Right Side - Auth Actions (keeping it right-aligned) */}
                    <div className="flex items-center gap-3">
                        {isAuthenticated ? (
                            <div className="flex items-center gap-4">
                                <div className="hidden sm:flex flex-col items-end mr-1">
                                    <span className="text-sm font-bold text-gray-900 leading-none">
                                        {user?.name || 'User'}
                                    </span>
                                    <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
                                        Citizen
                                    </span>
                                </div>
                                <button
                                    onClick={logout}
                                    className="px-6 py-2.5 bg-gray-900 hover:bg-black !text-white rounded-xl font-bold transition-all shadow-lg shadow-gray-200 text-sm"
                                >
                                    Log Out
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link
                                    to="/login"
                                    className="px-6 py-2.5 text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    to="/register"
                                    className="px-6 py-2.5 bg-water-600 hover:bg-water-700 !text-white rounded-xl font-bold transition-all shadow-lg shadow-water-200 text-sm"
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
