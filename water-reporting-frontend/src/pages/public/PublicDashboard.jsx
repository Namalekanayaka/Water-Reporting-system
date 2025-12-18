import React from 'react';
import { Link } from 'react-router-dom';

const PublicDashboard = () => {
    return (
        <div className="w-full bg-[#fbfbfd] min-h-screen p-6 md:p-12">
            <div className="max-w-[1400px] mx-auto">
                {/* Minimalist Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="animate-in fade-in slide-in-from-left-4 duration-700">
                        <span className="text-water-600 font-bold uppercase tracking-widest text-[13px] mb-3 block">Live Insights</span>
                        <h1 className="text-[40px] md:text-[56px] font-black tracking-tight text-gray-900 leading-none">
                            Community Dashboard.
                        </h1>
                        <p className="text-[19px] text-gray-400 font-medium mt-4">Real-time monitoring of our collective water health.</p>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-100 shadow-sm animate-in fade-in slide-in-from-right-4 duration-700">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                        <span className="text-[13px] font-bold text-gray-600 uppercase tracking-wider">Systems Nominal</span>
                    </div>
                </div>

                {/* Stat Grid - Ultra Clean */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {[
                        { label: "Submitted Reports", value: "1,234", trend: "+12%", color: "text-water-600", bg: "bg-white" },
                        { label: "Resolved Issues", value: "892", trend: "72%", color: "text-emerald-500", bg: "bg-white" },
                        { label: "Critical Priority", value: "342", trend: "28%", color: "text-orange-500", bg: "bg-white" }
                    ].map((stat, i) => (
                        <div key={i} className={`${stat.bg} rounded-[32px] p-10 border border-transparent hover:border-gray-100 transition-all shadow-apple hover:shadow-apple-hover animate-in fade-in zoom-in-95 duration-500`} style={{ animationDelay: `${i * 100}ms` }}>
                            <h3 className="text-[15px] font-bold text-gray-400 uppercase tracking-widest mb-2">{stat.label}</h3>
                            <div className="flex items-baseline gap-4">
                                <span className="text-[48px] font-black text-gray-900 leading-tight">{stat.value}</span>
                                <span className={`text-[17px] font-bold ${stat.color}`}>{stat.trend}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Content Sections */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Activity Feed - Left */}
                    <div className="lg:col-span-8 space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 transition-all">
                        <div className="bg-white rounded-[40px] p-10 shadow-apple border border-gray-50/50">
                            <div className="flex items-center justify-between mb-10">
                                <h2 className="text-2xl font-black text-gray-900 tracking-tight">Recent Activity</h2>
                                <Link to="/report" className="text-water-600 font-bold hover:underline text-sm uppercase tracking-widest">Submit Issue</Link>
                            </div>

                            <div className="space-y-4">
                                {[
                                    { type: "Pipeline Leakage", loc: "Colombo District", time: "2h ago", priority: "Critical", pColor: "text-red-500 bg-red-50" },
                                    { type: "Low Pressure", loc: "Gampaha District", time: "5h ago", priority: "High", pColor: "text-orange-500 bg-orange-50" },
                                    { type: "Water Quality", loc: "Kandy District", time: "1d ago", priority: "Resolved", pColor: "text-emerald-500 bg-emerald-50" },
                                    { type: "No Supply", loc: "Matara Fort", time: "2d ago", priority: "Medium", pColor: "text-blue-500 bg-blue-50" }
                                ].map((issue, i) => (
                                    <div key={i} className="flex items-center justify-between p-6 rounded-[24px] hover:bg-gray-50/50 transition-all border border-transparent hover:border-gray-100 group">
                                        <div className="flex items-center gap-6">
                                            <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-xl group-hover:bg-white transition-colors shadow-sm">💧</div>
                                            <div>
                                                <h4 className="text-[17px] font-bold text-gray-900">{issue.type}</h4>
                                                <p className="text-[14px] text-gray-400 font-medium">{issue.loc} • {issue.time}</p>
                                            </div>
                                        </div>
                                        <span className={`px-4 py-1.5 rounded-full text-[12px] font-black uppercase tracking-wider ${issue.pColor}`}>
                                            {issue.priority}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Breakdown & Actions - Right */}
                    <div className="lg:col-span-4 space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500 transition-all">
                        {/* Issue breakdown */}
                        <div className="bg-white rounded-[40px] p-10 shadow-apple border border-gray-50/50">
                            <h2 className="text-xl font-black text-gray-900 tracking-tight mb-10">Categories</h2>
                            <div className="space-y-6">
                                {[
                                    { label: "Pipeline Leakage", val: "45%", color: "bg-red-500" },
                                    { label: "Low Pressure", val: "28%", color: "bg-orange-500" },
                                    { label: "Water Quality", val: "18%", color: "bg-blue-500" },
                                    { label: "No Supply", val: "9%", color: "bg-purple-500" }
                                ].map((item, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-[14px] font-bold text-gray-600">{item.label}</span>
                                            <span className="text-[14px] font-black text-gray-900">{item.val}</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                            <div className={`h-full ${item.color}`} style={{ width: item.val }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Action Box - Dark Apple Style */}
                        <div className="bg-gray-900 rounded-[40px] p-10 shadow-2xl text-white relative overflow-hidden group">
                            <div className="relative z-10">
                                <h2 className="text-2xl font-black mb-4">Ready to help?</h2>
                                <p className="text-gray-400 text-[15px] font-medium mb-8 leading-relaxed">
                                    Your report could save thousands of liters of clean water today.
                                </p>
                                <Link to="/report" className="block w-full py-4 bg-white !text-black text-center rounded-full font-black text-[15px] hover:bg-gray-100 transition-all transform active:scale-95">
                                    File a Report
                                </Link>
                            </div>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-water-500/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-2xl group-hover:bg-water-500/20 transition-all"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PublicDashboard;
