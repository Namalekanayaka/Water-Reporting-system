import React from 'react';
import { Link } from 'react-router-dom';

const PublicDashboard = () => {
    return (
        <div className="w-full p-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-1">Hello, Margaret</h1>
                    <p className="text-gray-500">Track team progress here. You almost reach a goal!</p>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500">16 May, 2023</span>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center">
                            <img src="https://ui-avatars.com/api/?name=Margaret&background=FB923C&color=fff" alt="User" className="w-full h-full rounded-full object-cover" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-900">Megan Norton</p>
                            <p className="text-xs text-gray-500">@magnorton</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Finished */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                            </svg>
                        </div>
                        <h3 className="text-sm font-medium text-gray-600">Finished</h3>
                    </div>
                    <div className="flex items-end gap-2">
                        <span className="text-3xl font-bold text-gray-900">18</span>
                        <span className="text-sm text-emerald-600 mb-1">+8 tasks</span>
                    </div>
                </div>

                {/* Tracked */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                        </div>
                        <h3 className="text-sm font-medium text-gray-600">Tracked</h3>
                    </div>
                    <div className="flex items-end gap-2">
                        <span className="text-3xl font-bold text-gray-900">31h</span>
                        <span className="text-sm text-red-600 mb-1">-6 hours</span>
                    </div>
                </div>

                {/* Efficiency */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                            </svg>
                        </div>
                        <h3 className="text-sm font-medium text-gray-600">Efficiency</h3>
                    </div>
                    <div className="flex items-end gap-2">
                        <span className="text-3xl font-bold text-gray-900">93%</span>
                        <span className="text-sm text-emerald-600 mb-1">+12%</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Performance & Tasks */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Performance Chart */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold text-gray-900">Performance</h2>
                            <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600">
                                <option>01-07 May</option>
                            </select>
                        </div>
                        <div className="h-64 flex items-center justify-center text-gray-400">
                            <div className="text-center">
                                <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                                <p className="text-sm">Performance chart placeholder</p>
                            </div>
                        </div>
                    </div>

                    {/* Current Tasks */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">Current Tasks</h2>
                                <p className="text-sm text-gray-500">Done 30%</p>
                            </div>
                            <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600">
                                <option>Week</option>
                            </select>
                        </div>
                        <div className="space-y-3">
                            {/* Task 1 */}
                            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10"></circle>
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-sm font-medium text-gray-900">Product Review for UI8 Market</h3>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded">In progress</span>
                                    <span className="text-sm text-gray-500">4h</span>
                                    <button className="text-gray-400 hover:text-gray-600">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                            <circle cx="12" cy="12" r="2"></circle>
                                            <circle cx="12" cy="5" r="2"></circle>
                                            <circle cx="12" cy="19" r="2"></circle>
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Task 2 */}
                            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10"></circle>
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-sm font-medium text-gray-900">UX Research for Product</h3>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded">On hold</span>
                                    <span className="text-sm text-gray-500">8h</span>
                                    <button className="text-gray-400 hover:text-gray-600">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                            <circle cx="12" cy="12" r="2"></circle>
                                            <circle cx="12" cy="5" r="2"></circle>
                                            <circle cx="12" cy="19" r="2"></circle>
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Task 3 */}
                            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-sm font-medium text-gray-900">App design and development</h3>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded">Done</span>
                                    <span className="text-sm text-gray-500">32h</span>
                                    <button className="text-gray-400 hover:text-gray-600">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                            <circle cx="12" cy="12" r="2"></circle>
                                            <circle cx="12" cy="5" r="2"></circle>
                                            <circle cx="12" cy="19" r="2"></circle>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Activity */}
                <div className="space-y-6">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900 mb-6">Activity</h2>
                        <div className="space-y-4">
                            {/* Activity 1 */}
                            <div className="flex gap-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex-shrink-0">
                                    <img src="https://ui-avatars.com/api/?name=Floyd+Miles&background=3B82F6&color=fff" alt="User" className="w-full h-full rounded-full object-cover" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-start justify-between mb-1">
                                        <h4 className="text-sm font-semibold text-gray-900">Floyd Miles</h4>
                                        <span className="text-xs text-gray-400">10:15 AM</span>
                                    </div>
                                    <p className="text-xs text-gray-500 mb-2">Commented on Stark Project</p>
                                    <div className="bg-gray-50 rounded-lg p-3">
                                        <p className="text-xs text-gray-700">Hi! Next week we'll start a new project. I'll tell you all the details later</p>
                                    </div>
                                </div>
                            </div>

                            {/* Activity 2 */}
                            <div className="flex gap-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex-shrink-0">
                                    <img src="https://ui-avatars.com/api/?name=Guy+Hawkins&background=9333EA&color=fff" alt="User" className="w-full h-full rounded-full object-cover" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-start justify-between mb-1">
                                        <h4 className="text-sm font-semibold text-gray-900">Guy Hawkins</h4>
                                        <span className="text-xs text-gray-400">10:15 AM</span>
                                    </div>
                                    <p className="text-xs text-gray-500">Added a file to 7Heros Project</p>
                                    <div className="mt-2 flex items-center gap-2 bg-gray-50 rounded-lg p-2">
                                        <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2">
                                                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                                                <polyline points="13 2 13 9 20 9"></polyline>
                                            </svg>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-xs font-medium text-gray-900">Homepage.fig</p>
                                            <p className="text-xs text-gray-400">13.4 Mb</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Activity 3 */}
                            <div className="flex gap-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex-shrink-0">
                                    <img src="https://ui-avatars.com/api/?name=Kristin+Watson&background=EC4899&color=fff" alt="User" className="w-full h-full rounded-full object-cover" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-start justify-between mb-1">
                                        <h4 className="text-sm font-semibold text-gray-900">Kristin Watson</h4>
                                        <span className="text-xs text-gray-400">10:15 AM</span>
                                    </div>
                                    <p className="text-xs text-gray-500">Commented on 7Heros Project</p>
                                </div>
                            </div>
                        </div>

                        {/* Message Input */}
                        <div className="mt-6 pt-6 border-t border-gray-100">
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    placeholder="Write a message"
                                    className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-water-500/20 focus:border-water-500"
                                />
                                <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <line x1="12" y1="8" x2="12" y2="16"></line>
                                        <line x1="8" y1="12" x2="16" y2="12"></line>
                                    </svg>
                                </button>
                                <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PublicDashboard;
