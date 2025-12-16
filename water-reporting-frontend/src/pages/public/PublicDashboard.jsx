import React from 'react';
import { Link } from 'react-router-dom';
import GlassCard from '../../components/common/GlassCard';

const PublicDashboard = () => {
    return (
        <div className="w-full p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-4xl font-bold text-white mb-2">Hi Isabella,</h1>
                    <p className="text-slate-400">Have a great day</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="w-11 h-11 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all border border-white/10">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                        </svg>
                    </button>
                    <div className="flex items-center gap-3 cursor-pointer">
                        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-water-400 to-water-600 overflow-hidden border-2 border-white/20">
                            <img src="https://ui-avatars.com/api/?name=Isabella&background=20897E&color=fff" alt="User" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Stats Cards */}
                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Water Status Card */}
                    <GlassCard className="p-6 col-span-full">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-white">Water Status</h3>
                            <div className="flex gap-2">
                                <button className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-white hover:bg-white/20 transition-all">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M12 5v14M5 12h14"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm">
                                <div className="text-3xl font-bold text-white mb-1">1,234</div>
                                <div className="text-sm text-slate-400">Total Reports</div>
                                <div className="text-xs text-emerald-400 mt-2">↑ 12%</div>
                            </div>
                            <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm">
                                <div className="text-3xl font-bold text-emerald-400 mb-1">892</div>
                                <div className="text-sm text-slate-400">Resolved</div>
                                <div className="text-xs text-emerald-400 mt-2">↑ 8%</div>
                            </div>
                        </div>
                    </GlassCard>

                    {/* Active Issues Card */}
                    <GlassCard className="p-6">
                        <h3 className="text-sm font-semibold text-slate-400 mb-2">Active Issues</h3>
                        <div className="text-4xl font-bold text-white mb-2">342</div>
                        <div className="text-xs text-orange-400">↑ 5% from last week</div>
                    </GlassCard>

                    {/* Pending Card */}
                    <GlassCard className="p-6">
                        <h3 className="text-sm font-semibold text-slate-400 mb-2">Pending</h3>
                        <div className="text-4xl font-bold text-white mb-2">28</div>
                        <div className="text-xs text-red-400">↓ 15% from last week</div>
                    </GlassCard>

                    {/* Team Activity */}
                    <GlassCard className="p-6 col-span-full">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold text-lg text-white">Team Activity</h3>
                            <button className="text-xs bg-white/10 rounded-full px-3 py-1.5 font-medium hover:bg-white/20 text-white border border-white/10">+ Add Member</button>
                        </div>
                        <div className="space-y-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="flex items-center gap-3 bg-white/5 rounded-xl p-3 backdrop-blur-sm">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-water-400 to-water-600 overflow-hidden">
                                        <img src={`https://ui-avatars.com/api/?name=User+${i}&background=random`} alt="User" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-bold text-white">Technician {i}</p>
                                        <p className="text-xs text-slate-400">Fixed leak in Sector {i}</p>
                                    </div>
                                    <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-md font-medium border border-emerald-500/30">Completed</span>
                                </div>
                            ))}
                        </div>
                    </GlassCard>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    {/* Water Quality Card */}
                    <GlassCard className="p-6">
                        <h3 className="font-bold text-lg text-white mb-4">Water Quality</h3>
                        <div className="flex items-center justify-center mb-4">
                            <div className="relative w-32 h-32">
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle cx="64" cy="64" r="56" stroke="rgba(255,255,255,0.1)" strokeWidth="12" fill="transparent" />
                                    <circle cx="64" cy="64" r="56" stroke="#10b981" strokeWidth="12" fill="transparent" strokeDasharray="352" strokeDashoffset="88" strokeLinecap="round" />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-3xl font-bold text-white">75%</span>
                                    <span className="text-xs text-slate-400">Good</span>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-400">pH Level</span>
                                <span className="text-white font-medium">7.2</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-400">Chlorine</span>
                                <span className="text-white font-medium">0.5 ppm</span>
                            </div>
                        </div>
                    </GlassCard>

                    {/* Quick Actions */}
                    <GlassCard className="p-6">
                        <h3 className="font-bold text-lg text-white mb-4">Quick Actions</h3>
                        <div className="space-y-3">
                            <Link to="/report" className="block w-full py-3 bg-water-600/40 backdrop-blur-sm text-white rounded-xl font-semibold text-sm hover:bg-water-600/60 transition-colors text-center border border-water-500/30">
                                Report Issue
                            </Link>
                            <button className="w-full py-3 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold text-sm hover:bg-white/20 transition-colors border border-white/10">
                                View Map
                            </button>
                        </div>
                    </GlassCard>

                    {/* System Status */}
                    <GlassCard className="p-6 bg-gradient-to-br from-water-600/20 to-water-800/20">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                            <h3 className="font-bold text-sm text-white">System Online</h3>
                        </div>
                        <p className="text-xs text-slate-300 mb-4">All systems operational</p>
                        <div className="text-xs text-slate-400">Last updated: 2 min ago</div>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
};

export default PublicDashboard;
