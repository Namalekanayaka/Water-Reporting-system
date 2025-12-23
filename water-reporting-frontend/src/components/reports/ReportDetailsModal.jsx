import React, { useState, useEffect } from 'react';
import { getTeams } from '../../services/api/authority';
import ReportsMap from '../maps/ReportsMap';

const ReportDetailsModal = ({ report, onClose, onUpdateStatus }) => {
    const [teams, setTeams] = useState([]);
    const [assignedTeam, setAssignedTeam] = useState(report.assignedTeamId || '');

    useEffect(() => {
        const fetchTeams = async () => {
            const { success, teams: data } = await getTeams();
            if (success) setTeams(data);
        };
        fetchTeams();
    }, []);

    const handleAssignTeam = (e) => {
        const teamId = e.target.value;
        setAssignedTeam(teamId);
        onUpdateStatus(report.id, report.status, 'Team Assigned', teamId);
    };

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
                            <span className="text-xs font-black text-md-on-surface-variant uppercase tracking-widest">ID: #{report.id.substring(0, 8)}</span>
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
                        {/* Map View */}
                        <div className="aspect-video bg-md-surface-variant/20 rounded-2xl border border-md-outline/10 flex items-center justify-center relative overflow-hidden group">
                            {report.location && report.location.lat ? (
                                <div className="w-full h-full">
                                    <ReportsMap
                                        reports={[report]}
                                        center={[report.location.lat, report.location.lng]}
                                        zoom={15}
                                        height="100%"
                                    />
                                </div>
                            ) : (
                                <div className="absolute inset-0 bg-slate-200 flex items-center justify-center text-gray-500 font-bold">
                                    No Location Data
                                </div>
                            )}
                        </div>

                        {/* Images */}
                        <div>
                            <h3 className="font-bold text-md-on-surface mb-3">Attached Evidence</h3>
                            <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
                                {report.images && report.images.length > 0 ? (
                                    report.images.map((imgUrl, i) => (
                                        <a key={i} href={imgUrl} target="_blank" rel="noopener noreferrer" className="shrink-0 group relative">
                                            <div className="w-32 h-32 bg-md-surface-variant/20 rounded-xl border border-md-outline/10 overflow-hidden">
                                                <img src={imgUrl} alt="Evidence" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                                            </div>
                                        </a>
                                    ))
                                ) : (
                                    <div className="w-full p-4 text-sm text-md-on-surface-variant/70 italic border border-dashed border-md-outline/20 rounded-xl bg-md-surface-variant/10 text-center">
                                        No images attached to this report.
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <h3 className="font-bold text-md-on-surface mb-2">Description</h3>
                            <div className="bg-md-surface-variant/10 p-4 rounded-2xl border border-md-outline/5">
                                <p className="text-md-on-surface-variant leading-relaxed text-sm">
                                    {report.description || "No description provided."}
                                </p>
                            </div>
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
                                "Analysis based on provided description and imagery."
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
                                                onClick={() => onUpdateStatus(report.id, status, 'Status updated via Console')}
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
                                    <select
                                        value={assignedTeam}
                                        onChange={handleAssignTeam}
                                        className="w-full bg-white p-2.5 rounded-xl border border-md-outline/20 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-md-primary/20 appearance-none cursor-pointer"
                                    >
                                        <option value="">-- Select Response Unit --</option>
                                        {teams.map(team => (
                                            <option key={team.id} value={team.id}>
                                                {team.name} ({team.status.toUpperCase()})
                                            </option>
                                        ))}
                                    </select>
                                    <p className="text-[10px] text-md-on-surface-variant/60 mt-1 pl-1">
                                        Assigning a team will notify unit leaders.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-md-outline/10">
                            <div className="flex justify-between items-center text-sm text-md-on-surface-variant mb-2">
                                <span>Reported by</span>
                                <span className="font-bold truncate max-w-[150px]" title={report.userEmail}>{report.userEmail || "Anonymous"}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm text-md-on-surface-variant">
                                <span>User ID</span>
                                <span className="font-mono text-xs opacity-70">{report.userId ? report.userId.substring(0, 8) + '...' : 'N/A'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportDetailsModal;
