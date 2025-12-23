import React from 'react';
import { useNavigate } from 'react-router-dom';

const PriorityQueue = ({ reports = [] }) => {
    const navigate = useNavigate();

    const getSeverityColor = (score) => {
        if (score >= 0.8) return 'bg-md-error/10 text-md-error border-md-error/20';
        if (score >= 0.5) return 'bg-orange-50 text-orange-700 border-orange-100';
        return 'bg-blue-50 text-blue-700 border-blue-100';
    };

    return (
        <div className="bg-md-surface-variant/20 backdrop-blur-sm rounded-[32px] border border-md-outline/10 flex flex-col h-full overflow-hidden">
            <div className="p-8 border-b border-md-outline/5 flex justify-between items-center bg-white/30">
                <div>
                    <h3 className="text-xl font-black text-md-on-surface tracking-tight">Priority Queue</h3>
                    <p className="text-xs text-md-on-surface-variant font-bold uppercase tracking-widest mt-1">AI-Ranked Critical Issues</p>
                </div>
                <button
                    onClick={() => navigate('/authority/issues')}
                    className="text-xs font-bold text-md-primary hover:text-white uppercase tracking-wider bg-md-primary/10 hover:bg-md-primary px-5 py-2.5 rounded-xl transition-all duration-300"
                >
                    View All
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {reports.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-md-on-surface-variant/60">
                        <svg className="w-12 h-12 mb-4 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="font-medium">No critical issues pending.</p>
                    </div>
                ) : (
                    reports.map((report) => (
                        <div key={report.id} className="bg-md-surface p-5 rounded-[20px] border border-md-outline/5 hover:border-md-primary/30 hover:shadow-md-1 transition-all cursor-pointer group relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-md-surface-variant/20 to-transparent -mr-4 -mt-4 rounded-full"></div>

                            <div className="relative z-10 flex justify-between items-start mb-3">
                                <span className={`text-[10px] font-black px-2.5 py-1 rounded-lg border uppercase tracking-wide ${getSeverityColor(report.aiSeverityScore)}`}>
                                    Severity: {(report.aiSeverityScore * 100).toFixed(0)}
                                </span>
                                <span className="text-[10px] text-md-on-surface-variant font-bold uppercase tracking-wide bg-md-surface-variant/30 px-2.5 py-1 rounded-lg">
                                    {report.timeAgo}
                                </span>
                            </div>

                            <h4 className="font-bold text-lg text-md-on-surface mb-2 group-hover:text-md-primary transition-colors line-clamp-1 relative z-10">
                                {report.title}
                            </h4>

                            <div className="flex items-center text-xs text-md-on-surface-variant font-medium gap-2 mb-4 relative z-10">
                                <div className="p-1 bg-md-surface-variant/30 rounded-full">
                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                {report.location.address}
                            </div>

                            <div className="flex gap-3 relative z-10">
                                <button
                                    onClick={(e) => { e.stopPropagation(); navigate('/authority/issues'); }}
                                    className="flex-1 bg-md-surface-variant/30 hover:bg-md-surface-variant text-xs font-bold py-2.5 rounded-xl text-md-on-surface transition-colors">
                                    Details
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); navigate('/authority/issues'); }}
                                    className="flex-1 bg-md-primary hover:bg-water-700 text-xs font-bold py-2.5 rounded-xl text-white transition-colors shadow-sm">
                                    Assign Team
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
