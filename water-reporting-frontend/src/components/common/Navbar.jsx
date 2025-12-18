import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
    const { isAuthenticated, user, logout } = useAuth();

    return (
        <nav className="bg-white/70 backdrop-blur-xl border-b border-gray-100/50 sticky top-0 z-40">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                <div className="flex justify-between items-center h-[52px]"> {/* Standard Apple Nav Height */}
                    <div className="flex items-center gap-6">
                        {/* Mobile Menu Icon - Clean Apple Style */}
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="md:hidden p-1 text-gray-800 focus:outline-none"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </button>
                    </div>

                    {/* Minimalist Navigation - Hidden as per user request to move all to sidebar */}
                    <div className="hidden md:flex items-center gap-8">
                        {/* Space for future minimal items if needed */}
                    </div>

                    {/* Auth Actions - Very Clean */}
                    <div className="flex items-center gap-6">
                        {isAuthenticated ? (
                            <div className="flex items-center gap-6">
                                <span className="text-[12px] font-bold text-gray-500 uppercase tracking-widest hidden sm:inline">
                                    {user?.name}
                                </span>
                                <button
                                    onClick={logout}
                                    className="text-[13px] font-bold text-gray-900 bg-gray-100 hover:bg-gray-200 px-4 py-1.5 rounded-full transition-all active:scale-95"
                                >
                                    Sign out
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-6">
                                <Link
                                    to="/login"
                                    className="text-[13px] font-bold text-gray-500 hover:text-gray-900 transition-colors"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    to="/register"
                                    className="text-[13px] font-bold !text-white bg-gray-900 hover:bg-black px-4 py-1.5 rounded-full transition-all active:scale-95"
                                >
                                    Get Started
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
