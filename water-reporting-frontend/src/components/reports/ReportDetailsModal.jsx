import React from 'react';
import StatusBadge from './StatusBadge';
import SeverityBadge from './SeverityBadge';

const ReportDetailsModal = ({ report, onClose, onUpdateStatus }) => {
    if (!report) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            <div className="relative bg-md-surface w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[32px] shadow-md-3 border border-md-outline/10 animate-in fade-in zoom-in duration-300">
                {/* Header */}
                <div className="sticky top-0 z-10 bg-md-surface/80 backdrop-blur-md p-6 border-b border-md-outline/10 flex justify-between items-start">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-xs font-black text-md-on-surface-variant uppercase tracking-widest">ID: #{report.id}</span>
                            <span className="text-md-on-surface-variant">•</span>
                            <span className="text-xs font-medium text-md-on-surface-variant">{report.timestamp}</span>
                        </div>
                        <h2 className="text-2xl font-black text-md-on-surface">{report.title}</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-md-surface-variant/50 transition-colors"
                    >
                        <svg className="w-6 h-6 text-md-on-surface-variant" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Details */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Map Placeholder */}
                        <div className="aspect-video bg-md-surface-variant/20 rounded-2xl border border-md-outline/10 flex items-center justify-center relative overflow-hidden group">
                            <div className="absolute inset-0 bg-[url('https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png')] opacity-50 bg-cover bg-center"></div>
                            <div className="relative z-10 bg-white/80 p-4 rounded-xl backdrop-blur-md shadow-sm text-center">
                                <p className="font-bold text-md-on-surface">Map View</p>
                                <p className="text-xs text-md-on-surface-variant">{report.location.address}</p>
                            </div>
                        </div>

                        {/* Images */}
                        <div>
                            <h3 className="font-bold text-md-on-surface mb-3">Attached Evidence</h3>
                            <div className="flex gap-4 overflow-x-auto pb-2">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="w-32 h-32 shrink-0 bg-md-surface-variant/20 rounded-xl border border-md-outline/10 flex items-center justify-center">
                                        <svg className="w-8 h-8 text-md-on-surface-variant/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <h3 className="font-bold text-md-on-surface mb-2">Description</h3>
                            <p className="text-md-on-surface-variant leading-relaxed">
                                {report.description}
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Actions & Meta */}
                    <div className="space-y-6">
                        {/* AI Analysis Card */}
                        <div className="bg-md-primary-container/20 p-5 rounded-2xl border border-md-primary/10">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-6 h-6 rounded-md bg-md-primary text-white flex items-center justify-center text-xs font-bold">AI</div>
                                <h3 className="font-bold text-md-primary">Severity Analysis</h3>
                            </div>
                            <div className="mb-4">
                                <div className="flex justify-between items-end mb-1">
                                    <span className="text-sm font-medium text-md-on-surface-variant">Score</span>
                                    <span className="text-xl font-black text-md-primary">{(report.aiSeverityScore * 100).toFixed(0)}/100</span>
                                </div>
                                <div className="h-2 bg-md-surface-variant/50 rounded-full overflow-hidden">
                                    <div className="h-full bg-md-primary" style={{ width: `${report.aiSeverityScore * 100}%` }}></div>
                                </div>
                            </div>
                            <p className="text-xs text-md-on-surface-variant/80 italic">
                                "High probability of major pipe burst based on image analysis and citizen report density."
                            </p>
                        </div>

                        {/* Status Management */}
                        <div className="bg-md-surface-variant/20 p-5 rounded-2xl border border-md-outline/10">
                            <h3 className="font-bold text-md-on-surface mb-4">Management</h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-md-on-surface-variant uppercase tracking-wider mb-2">Current Status</label>
                                    <div className="flex flex-wrap gap-2">
                                        {['pending', 'in_progress', 'resolved', 'closed'].map((status) => (
                                            <button
                                                key={status}
                                                onClick={() => onUpdateStatus(report.id, status)}
                                                className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all border ${report.status === status
                                                        ? 'bg-md-primary text-white border-md-primary shadow-md'
                                                        : 'bg-white text-md-on-surface-variant border-md-outline/20 hover:border-md-primary/50'
                                                    }`}
                                            >
                                                {status.replace('_', ' ')}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-md-on-surface-variant uppercase tracking-wider mb-2">Assign Team</label>
                                    <select className="w-full bg-white p-2.5 rounded-xl border border-md-outline/20 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-md-primary/20">
                                        <option>Unassigned</option>
                                        <option>Team Alpha (Busy)</option>
                                        <option>Team Beta (Available)</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-md-outline/10">
                            <div className="flex justify-between items-center text-sm text-md-on-surface-variant">
                                <span>Reported by</span>
                                <span className="font-bold">Rajesh Kumar</span>
                            </div>
                            <div className="flex justify-between items-center text-sm text-md-on-surface-variant mt-2">
                                <span>Phone</span>
                                <span className="font-bold">+91 98765 43210</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportDetailsModal;
