import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="space-y-16">
            {/* Hero Section */}
            <section className="text-center py-20 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl text-white">
                <h1 className="text-5xl font-bold mb-6">
                    Report Water Issues in Your Community
                </h1>
                <p className="text-xl mb-8 max-w-2xl mx-auto">
                    AI-powered platform for real-time water issue reporting, tracking, and management.
                    Help your community access clean water.
                </p>
                <div className="flex justify-center gap-4">
                    <Link
                        to="/report"
                        className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition"
                    >
                        Report an Issue
                    </Link>
                    <Link
                        to="/dashboard"
                        className="px-8 py-4 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition"
                    >
                        View Dashboard
                    </Link>
                </div>
            </section>

            {/* Stats Section */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">1,234</div>
                    <div className="text-gray-600 dark:text-gray-400">Total Reports</div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center">
                    <div className="text-4xl font-bold text-green-600 mb-2">892</div>
                    <div className="text-gray-600 dark:text-gray-400">Resolved Issues</div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center">
                    <div className="text-4xl font-bold text-orange-600 mb-2">342</div>
                    <div className="text-gray-600 dark:text-gray-400">Active Reports</div>
                </div>
            </section>

            {/* Features Section */}
            <section>
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
                    How It Works
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                        <div className="text-4xl mb-4">📍</div>
                        <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
                            Report Issues
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Submit water problems with location, photos, and details. AI predicts severity.
                        </p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                        <div className="text-4xl mb-4">📊</div>
                        <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
                            Track Progress
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Monitor reports in real-time with interactive maps and analytics dashboards.
                        </p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                        <div className="text-4xl mb-4">🏛️</div>
                        <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
                            Get Solutions
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Authorities receive prioritized alerts and AI-powered resource allocation.
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-blue-50 dark:bg-gray-800 p-12 rounded-2xl text-center">
                <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
                    Join the Movement for Clean Water
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
                    Aligned with UN Sustainable Development Goal 6: Clean Water and Sanitation for All
                </p>
                <Link
                    to="/register"
                    className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition inline-block"
                >
                    Get Started Today
                </Link>
            </section>
        </div>
    );
};

export default Home;
