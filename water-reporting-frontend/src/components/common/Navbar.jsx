import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
    const { isAuthenticated, user, logout } = useAuth();

    return (
        <nav className="bg-md-surface/80 backdrop-blur-md border-b border-md-outline/10 h-[64px] flex items-center sticky top-0 z-40 px-4 md:px-8">
            <div className="w-full max-w-[1400px] mx-auto flex justify-between items-center">
                <div className="flex items-center gap-4">
                    {/* M3 Hamburger Icon */}
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="md:hidden p-2 text-md-on-surface hover:bg-md-surface-variant/50 rounded-full transition-colors active:scale-90"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    {/* Optional centered title on mobile could go here */}
                </div>

                <div className="flex items-center gap-3">
                    {isAuthenticated ? (
                        <div className="flex items-center gap-4">
                            <div className="hidden sm:flex flex-col items-end">
                                <span className="text-[14px] font-black text-md-on-surface leading-none mb-1">
                                    {user?.name}
                                </span>
                                <span className="text-[10px] font-bold text-md-primary uppercase tracking-widest leading-none">
                                    {user?.role} Access
                                </span>
                            </div>
                            <button
                                onClick={logout}
                                className="h-10 px-6 bg-md-surface-variant text-md-on-surface-variant hover:bg-md-primary hover:text-white text-[13px] font-bold rounded-full transition-all active:scale-95 shadow-sm"
                            >
                                Sign out
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link
                                to="/login"
                                className="h-10 px-6 flex items-center text-[13px] font-bold text-md-primary hover:bg-md-primary/5 rounded-full transition-colors"
                            >
                                Sign In
                            </Link>
                            <Link
                                to="/register"
                                className="h-10 px-8 flex items-center text-[13px] font-bold bg-md-primary text-md-on-primary hover:shadow-md hover:bg-md-primary/90 rounded-full transition-all active:scale-95 shadow-sm"
                            >
                                Register
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
