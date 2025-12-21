import React from 'react';
import { useNavigate } from 'react-router-dom';

const PriorityQueue = ({ reports = [] }) => {
    const navigate = useNavigate();

    const getSeverityColor = (score) => {
        if (score >= 0.8) return 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800';
        if (score >= 0.5) return 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800';
        return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800';
    };

    return (
        <div className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-md rounded-3xl shadow-sm border border-white/50 dark:border-slate-700/50 overflow-hidden flex flex-col h-full">
            <div className="p-6 border-b border-md-outline/5 flex justify-between items-center">
                <div>
                    <h3 className="text-xl font-black text-md-on-surface">Priority Queue</h3>
                    <p className="text-xs text-md-on-surface-variant font-medium mt-1">AI-Ranked Critical Issues</p>
                </div>
                <button
                    onClick={() => navigate('/authority/issues')}
                    className="text-xs font-bold text-md-primary hover:text-md-primary/80 uppercase tracking-wider bg-md-primary/10 hover:bg-md-primary/20 px-4 py-2 rounded-xl transition-colors"
                >
                    View All
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {reports.length === 0 ? (
                    <div className="text-center py-10 text-md-on-surface-variant/60">
                        No critical issues pending.
                    </div>
                ) : (
                    reports.map((report) => (
                        <div key={report.id} className="bg-white/50 dark:bg-slate-700/30 p-4 rounded-2xl border border-white/50 dark:border-slate-600/30 hover:shadow-md hover:scale-[1.02] transition-all cursor-pointer group">
                            <div className="flex justify-between items-start mb-2">
                                <span className={`text-[10px] font-bold px-2 py-1 rounded-lg border ${getSeverityColor(report.aiSeverityScore)}`}>
                                    SCORE: {(report.aiSeverityScore * 100).toFixed(0)}
                                </span>
                                <span className="text-[10px] text-md-on-surface-variant font-medium bg-md-surface-variant/50 px-2 py-1 rounded-lg">
                                    {report.timeAgo}
                                </span>
                            </div>
                            <h4 className="font-bold text-md-on-surface mb-1 group-hover:text-md-primary transition-colors line-clamp-1">
                                {report.title}
                            </h4>
                            <div className="flex items-center text-xs text-md-on-surface-variant/80 gap-1 mb-3">
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {report.location.address}
                            </div>
                            <div className="flex gap-2 mt-auto">
                                <button className="flex-1 bg-md-surface text-xs font-bold py-2 rounded-xl border border-md-outline/10 text-md-on-surface hover:bg-md-surface-variant transition-colors">
                                    Details
                                </button>
                                <button className="flex-1 bg-md-primary text-xs font-bold py-2 rounded-xl text-white hover:bg-md-primary/90 transition-colors shadow-md shadow-md-primary/20">
                                    Assign
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default PriorityQueue;
