import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
    const { isAuthenticated, user, logout } = useAuth();

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-30">
            <div className="max-w-full px-4 md:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="w-9 h-9 bg-water-600 rounded-xl flex items-center justify-center">
                            <span className="text-white font-bold text-lg">💧</span>
                        </div>
                        <span className="hidden md:inline text-lg font-bold text-gray-900">
                            Water Report
                        </span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden lg:flex items-center space-x-1">
                        <Link to="/" className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors font-medium">
                            Home
                        </Link>
                        <Link to="/dashboard" className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors font-medium">
                            Dashboard
                        </Link>
                        <Link to="/report" className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors font-medium">
                            Report Issue
                        </Link>
                    </div>

                    {/* Right Side - Auth */}
                    <div className="flex items-center space-x-3">
                        {isAuthenticated ? (
                            <div className="flex items-center space-x-3">
                                <span className="hidden sm:inline text-gray-700 font-medium">
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
                            <div className="flex items-center space-x-2">
                                <Link
                                    to="/login"
                                    className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors font-medium"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="px-4 py-2 bg-water-600 hover:bg-water-700 text-white rounded-lg transition-colors font-medium"
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
