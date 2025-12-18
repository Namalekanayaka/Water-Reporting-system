import React from 'react';
import { Link } from 'react-router-dom';

const PublicDashboard = () => {
    return (
        <div className="w-full p-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-1">Public Water Dashboard</h1>
                    <p className="text-gray-500">Real-time water issue tracking and community statistics</p>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500">{new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Total Reports */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-water-100 rounded-xl flex items-center justify-center">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#20897E" strokeWidth="2">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                <polyline points="14 2 14 8 20 8"></polyline>
                                <line x1="16" y1="13" x2="8" y2="13"></line>
                                <line x1="16" y1="17" x2="8" y2="17"></line>
                                <polyline points="10 9 9 9 8 9"></polyline>
                            </svg>
                        </div>
                        <h3 className="text-sm font-medium text-gray-600">Total Reports</h3>
                    </div>
                    <div className="flex items-end gap-2">
                        <span className="text-3xl font-bold text-gray-900">1,234</span>
                        <span className="text-sm text-emerald-600 mb-1">+45 this week</span>
                    </div>
                </div>

                {/* Resolved Issues */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                        </div>
                        <h3 className="text-sm font-medium text-gray-600">Resolved</h3>
                    </div>
                    <div className="flex items-end gap-2">
                        <span className="text-3xl font-bold text-gray-900">892</span>
                        <span className="text-sm text-emerald-600 mb-1">72% success rate</span>
                    </div>
                </div>

                {/* Active Issues */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FB923C" strokeWidth="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="8" x2="12" y2="12"></line>
                                <line x1="12" y1="16" x2="12.01" y2="16"></line>
                            </svg>
                        </div>
                        <h3 className="text-sm font-medium text-gray-600">Active Issues</h3>
                    </div>
                    <div className="flex items-end gap-2">
                        <span className="text-3xl font-bold text-gray-900">342</span>
                        <span className="text-sm text-orange-600 mb-1">28% pending</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Reports Chart & Recent Issues */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Reports Over Time Chart */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold text-gray-900">Reports Over Time</h2>
                            <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600">
                                <option>Last 7 Days</option>
                                <option>Last 30 Days</option>
                                <option>Last 90 Days</option>
                            </select>
                        </div>
                        <div className="h-64 flex items-center justify-center text-gray-400">
                            <div className="text-center">
                                <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                                <p className="text-sm">Chart will display here</p>
                            </div>
                        </div>
                    </div>

                    {/* Recent Water Issues */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">Recent Water Issues</h2>
                                <p className="text-sm text-gray-500">Latest reported problems</p>
                            </div>
                            <Link to="/report" className="text-sm text-water-600 hover:text-water-700 font-medium">
                                Report Issue →
                            </Link>
                        </div>
                        <div className="space-y-3">
                            {/* Issue 1 */}
                            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2">
                                        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-sm font-medium text-gray-900">Pipeline Leakage - Main Street</h3>
                                    <p className="text-xs text-gray-500">Colombo District</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded">Critical</span>
                                    <span className="text-sm text-gray-500">2h ago</span>
                                </div>
                            </div>

                            {/* Issue 2 */}
                            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2">
                                        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-sm font-medium text-gray-900">Low Water Pressure - Park Avenue</h3>
                                    <p className="text-xs text-gray-500">Gampaha District</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded">High</span>
                                    <span className="text-sm text-gray-500">5h ago</span>
                                </div>
                            </div>

                            {/* Issue 3 */}
                            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2">
                                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-sm font-medium text-gray-900">Water Quality Issue - 5th Street</h3>
                                    <p className="text-xs text-gray-500">Kandy District</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded">Resolved</span>
                                    <span className="text-sm text-gray-500">1d ago</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Issue Types & Quick Actions */}
                <div className="space-y-6">
                    {/* Issue Types Breakdown */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900 mb-6">Issue Types</h2>
                        <div className="space-y-4">
                            {/* Type 1 */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-gray-700">Pipeline Leakage</span>
                                    <span className="text-sm font-semibold text-gray-900">45%</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2">
                                    <div className="bg-red-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                                </div>
                            </div>

                            {/* Type 2 */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-gray-700">Low Pressure</span>
                                    <span className="text-sm font-semibold text-gray-900">28%</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2">
                                    <div className="bg-orange-500 h-2 rounded-full" style={{ width: '28%' }}></div>
                                </div>
                            </div>

                            {/* Type 3 */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-gray-700">Water Quality</span>
                                    <span className="text-sm font-semibold text-gray-900">18%</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2">
                                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '18%' }}></div>
                                </div>
                            </div>

                            {/* Type 4 */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-gray-700">No Supply</span>
                                    <span className="text-sm font-semibold text-gray-900">9%</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2">
                                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '9%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
                        <div className="space-y-3">
                            <Link to="/report" className="block w-full px-4 py-3 bg-water-600 hover:bg-water-700 !text-white rounded-xl font-semibold transition-colors text-center">
                                Report Water Issue
                            </Link>
                            <Link to="/map" className="block w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-colors text-center">
                                View Map
                            </Link>
                            <Link to="/statistics" className="block w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-colors text-center">
                                View Statistics
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PublicDashboard;
