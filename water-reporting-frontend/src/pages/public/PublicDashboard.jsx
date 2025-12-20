import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReportsMap from '../../components/maps/ReportsMap';
import { getAllReports } from '../../services/api/reports';

const PublicDashboard = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const data = await getAllReports();
                setReports(data.reports);
            } catch (error) {
                console.error("Error fetching dashboard map data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAll();
    }, []);

    const stats = [
        { label: "Active Incidents", value: "14", trend: "+2", color: "text-md-error" },
        { label: "Resolution Rate", value: "98.2%", trend: "High", color: "text-md-primary" },
        { label: "Avg. Response", value: "4.2h", trend: "-12m", color: "text-md-secondary" },
        { label: "Community Rep", value: "4,201", trend: "+124", color: "text-md-primary" },
    ];

    return (
        <div className="w-full bg-md-surface min-h-screen">
            <div className="max-w-[1400px] mx-auto">
                {/* M3 Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                    <div className="animate-in fade-in slide-in-from-left-4 duration-700">
                        <span className="text-md-primary font-black uppercase tracking-[0.2em] text-[11px] mb-3 block">Real-time Insights</span>
                        <h1 className="text-[40px] md:text-[64px] font-black tracking-tight text-md-on-surface leading-none">
                            System Pulse.
                        </h1>
                    </div>
                </div>

                {/* M3 Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {stats.map((stat, i) => (
                        <div key={i} className="bg-white rounded-[28px] p-8 shadow-md-1 hover:shadow-md-2 transition-all border border-md-outline/5 group">
                            <p className="text-[12px] font-black text-md-on-surface-variant uppercase tracking-widest mb-4 group-hover:text-md-primary transition-colors">{stat.label}</p>
                            <div className="flex items-end justify-between">
                                <h3 className={`text-4xl font-black tracking-tighter ${stat.color}`}>{stat.value}</h3>
                                <span className={`text-[12px] font-bold px-2 py-1 rounded-lg bg-md-surface-variant/50 text-md-on-surface-variant`}>
                                    {stat.trend}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* M3 Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
                    {/* Live Map Preview - M3 Elevated Card */}
                    <div className="lg:col-span-8 bg-white rounded-[32px] p-8 shadow-md-1 border border-md-outline/5 overflow-hidden flex flex-col min-h-[600px]">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-2xl font-black text-md-on-surface tracking-tight mb-1">Geospatial Awareness</h2>
                                <p className="text-[14px] text-md-on-surface-variant font-medium">Monitoring {reports.length} regional markers</p>
                            </div>
                            <Link
                                to="/map"
                                className="h-10 px-6 bg-md-primary text-white rounded-full text-[12px] font-bold flex items-center gap-2 hover:shadow-md active:scale-95 transition-all"
                            >
                                Open Full Map
                            </Link>
                        </div>
                        <div className="flex-1 rounded-[24px] overflow-hidden border border-md-outline/10 bg-md-surface-variant/10 shadow-inner min-h-[450px]">
                            {loading ? (
                                <div className="w-full h-full flex items-center justify-center">
                                    <div className="animate-spin h-10 w-10 border-4 border-md-primary border-t-transparent rounded-full"></div>
                                </div>
                            ) : (
                                <ReportsMap reports={reports} />
                            )}
                        </div>
                    </div>

                    {/* Regional & Categories - M3 Side Column */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* Categories Tonal Card */}
                        <div className="bg-md-secondary-container rounded-[32px] p-10 text-md-on-secondary-container shadow-sm border border-md-outline/5">
                            <h3 className="text-[15px] font-black uppercase tracking-widest text-md-on-secondary-container/60 mb-8">Incident Types</h3>
                            <div className="space-y-6">
                                {[
                                    { label: "Infrastructure", val: "45%", color: "bg-md-primary" },
                                    { label: "Quality", val: "28%", color: "bg-md-primary/70" },
                                    { label: "Supply", val: "18%", color: "bg-md-primary/40" },
                                    { label: "Other", val: "9%", color: "bg-md-primary/20" }
                                ].map((item, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-[14px] font-bold">{item.label}</span>
                                            <span className="text-[14px] font-black">{item.val}</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-white/30 rounded-full overflow-hidden">
                                            <div className={`h-full ${item.color}`} style={{ width: item.val }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Report CTA */}
                        <div className="bg-md-surface-variant rounded-[32px] p-10 border border-md-outline/10 relative overflow-hidden group">
                            <div className="relative z-10">
                                <h3 className="text-2xl font-black text-md-on-surface-variant mb-4">Ready to help?</h3>
                                <p className="text-[15px] text-md-on-surface-variant/80 font-medium mb-8 leading-relaxed">
                                    Your report can save thousands of liters of clean water today.
                                </p>
                                <Link
                                    to="/report"
                                    className="w-full py-4 bg-md-primary text-white rounded-2xl font-black text-[14px] flex items-center justify-center shadow-sm hover:shadow-md active:scale-95 transition-all"
                                >
                                    File New Report
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PublicDashboard;
