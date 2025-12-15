import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-200 mt-auto">
            <div className="max-w-[1400px] mx-auto px-6 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* About Section */}
                    <div>
                        <h3 className="text-base font-bold text-gray-800 mb-3">Water Report System</h3>
                        <p className="text-gray-500 text-sm">
                            AI-powered platform for reporting and managing water issues in your community.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-base font-bold text-gray-800 mb-3">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="text-gray-500 hover:text-emerald-600 text-sm transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard" className="text-gray-500 hover:text-emerald-600 text-sm transition-colors">
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link to="/report" className="text-gray-500 hover:text-emerald-600 text-sm transition-colors">
                                    Report Issue
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-base font-bold text-gray-800 mb-3">Resources</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-gray-500 hover:text-emerald-600 text-sm transition-colors">
                                    Documentation
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-500 hover:text-emerald-600 text-sm transition-colors">
                                    API
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-500 hover:text-emerald-600 text-sm transition-colors">
                                    Support
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-base font-bold text-gray-800 mb-3">Contact</h3>
                        <ul className="space-y-2 text-gray-500 text-sm">
                            <li>Email: support@waterreport.com</li>
                            <li>Phone: +1 234 567 8900</li>
                            <li>Address: 123 Water St, City</li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-200 mt-8 pt-6 text-center text-gray-500 text-sm">
                    <p>&copy; 2025 Water Report System. All rights reserved. | Aligned with UN SDG 6</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
