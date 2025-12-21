import React from 'react';
import StatusBadge from './StatusBadge';
import SeverityBadge from './SeverityBadge';

const ReportTable = ({ reports, onReportClick }) => {
    return (
        <div className="bg-md-surface backdrop-blur-sm rounded-[32px] border border-md-outline/10 shadow-sm overflow-hidden flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Toolbar */}
            <div className="p-6 border-b border-md-outline/5 flex flex-wrap gap-4 justify-between items-center bg-md-surface-variant/10">
                <div className="flex gap-3">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search reports..."
                            className="pl-10 pr-4 py-2.5 bg-white rounded-xl border border-md-outline/10 text-sm focus:outline-none focus:ring-2 focus:ring-md-primary/20 w-64 shadow-sm transition-all"
                        />
                        <svg className="w-4 h-4 text-md-on-surface-variant absolute left-3.5 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <select className="px-4 py-2.5 bg-white rounded-xl border border-md-outline/10 text-sm font-medium text-md-on-surface-variant focus:outline-none focus:ring-2 focus:ring-md-primary/20 shadow-sm cursor-pointer hover:border-md-primary/30 transition-colors">
                        <option>All Statuses</option>
                        <option>Pending</option>
                        <option>In Progress</option>
                        <option>Resolved</option>
                    </select>
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-2.5 rounded-xl bg-white border border-md-outline/10 text-md-on-surface-variant hover:bg-md-primary/5 hover:text-md-primary transition-colors shadow-sm">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                        </svg>
                    </button>
                    <button className="p-2.5 rounded-xl bg-white border border-md-outline/10 text-md-on-surface-variant hover:bg-md-primary/5 hover:text-md-primary transition-colors shadow-sm">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="flex-1 overflow-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-md-surface-variant/20 sticky top-0 z-10 backdrop-blur-md">
                        <tr>
                            <th className="p-5 text-xs font-black text-md-on-surface-variant uppercase tracking-wider w-20">ID</th>
                            <th className="p-5 text-xs font-black text-md-on-surface-variant uppercase tracking-wider">Issue</th>
                            <th className="p-5 text-xs font-black text-md-on-surface-variant uppercase tracking-wider">Location</th>
                            <th className="p-5 text-xs font-black text-md-on-surface-variant uppercase tracking-wider">Severity</th>
                            <th className="p-5 text-xs font-black text-md-on-surface-variant uppercase tracking-wider">Status</th>
                            <th className="p-5 text-xs font-black text-md-on-surface-variant uppercase tracking-wider text-right">Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-md-outline/5">
                        {reports.map((report) => (
                            <tr
                                key={report.id}
                                onClick={() => onReportClick(report)}
                                className="group hover:bg-md-surface-variant/10 cursor-pointer transition-colors"
                            >
                                <td className="p-5 text-sm font-bold text-md-on-surface-variant group-hover:text-md-primary transition-colors">#{report.id}</td>
                                <td className="p-5">
                                    <p className="font-bold text-md-on-surface text-sm mb-0.5 group-hover:text-md-primary transition-colors">{report.title}</p>
                                    <p className="text-xs text-md-on-surface-variant/70">{report.type}</p>
                                </td>
                                <td className="p-5 text-sm text-md-on-surface-variant max-w-[200px] truncate">{report.location.address}</td>
                                <td className="p-5">
                                    <SeverityBadge severity={report.priority} />
                                </td>
                                <td className="p-5">
                                    <StatusBadge status={report.status} />
                                </td>
                                <td className="p-5 text-right text-sm font-medium text-md-on-surface-variant/80">
                                    {report.timestamp}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Footer */}
            <div className="p-4 border-t border-md-outline/5 flex justify-between items-center bg-md-surface-variant/5">
                <p className="text-xs font-bold text-md-on-surface-variant uppercase tracking-wider">Showing 1-10 of 42</p>
                <div className="flex gap-2">
                    <button className="px-4 py-2 text-sm font-bold text-md-on-surface-variant bg-white rounded-lg border border-md-outline/10 hover:bg-md-surface-variant/20 transition-all disabled:opacity-50">Previous</button>
                    <button className="px-4 py-2 text-sm font-bold text-white bg-md-primary rounded-lg shadow-sm hover:bg-water-700 transition-all">Next</button>
                </div>
            </div>
        </div>
    );
};

export default ReportTable;
