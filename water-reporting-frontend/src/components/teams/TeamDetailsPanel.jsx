import React, { useState } from 'react';
import { getAllReports } from '../../services/api/reports';

const TeamDetailsPanel = ({ team, onAssign, onComplete }) => {
    const [isAssigning, setIsAssigning] = useState(false);
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(false);

    const startAssign = async () => {
        setIsAssigning(true);
        setLoading(true);
        const { success, reports: data } = await getAllReports();
        if (success) {
            setReports(data.filter(r => r.status === 'pending'));
        }
        setLoading(false);
    };

    if (!team) return (
        <div className="h-full flex flex-col items-center justify-center text-center p-10 text-md-on-surface-variant/50 bg-md-surface-variant/5 rounded-[32px] border-2 border-dashed border-md-outline/10">
            <span className="text-4xl mb-4 grayscale opacity-50">👥</span>
            <p className="font-bold">Select a team to view details</p>
        </div>
    );

    // Assignment Mode View
    if (isAssigning) {
        return (
            <div className="h-full bg-md-surface rounded-[32px] border border-md-outline/10 p-6 flex flex-col animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-black text-md-on-surface">Dispatch {team.name}</h2>
                    <button onClick={() => setIsAssigning(false)} className="text-sm font-bold text-md-on-surface-variant hover:text-red-500">Cancel</button>
                </div>

                <p className="text-sm text-md-on-surface-variant mb-4">Select an active emergency to deploy this unit immediately.</p>

                <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                    {loading ? (
                        <p className="text-center py-10 opacity-50">Scanning for alerts...</p>
                    ) : reports.length === 0 ? (
                        <div className="text-center py-10 bg-md-surface-variant/10 rounded-xl">
                            <p className="font-bold text-md-on-surface-variant">All Clear</p>
                            <p className="text-xs opacity-70">No pending reports found.</p>
                        </div>
                    ) : (
                        reports.map(report => (
                            <div key={report.id} className="p-4 bg-red-50 border border-red-100 rounded-xl hover:bg-red-100 transition-colors group">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-[10px] font-black uppercase text-red-800 tracking-wider">High Priority</span>
                                    <span className="text-xs font-mono text-red-800/60">{report.timestamp?.split(',')[1]}</span>
                                </div>
                                <h3 className="font-bold text-md-on-surface mb-1">{report.title || 'Water Issue'}</h3>
                                <p className="text-xs text-md-on-surface-variant mb-4 truncate">{report.location?.address || 'Unknown Location'}</p>
                                <button
                                    onClick={() => {
                                        onAssign(team, report.id, report.title);
                                        setIsAssigning(false);
                                    }}
                                    className="w-full py-2 bg-red-600 text-white rounded-lg text-xs font-bold hover:bg-red-700 shadow-md active:scale-95 transition-all"
                                >
                                    Confirm Dispatch
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        );
    }

    // Standard View
    return (
        <div className="h-full bg-md-surface rounded-[32px] border border-md-outline/10 p-6 flex flex-col animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-md-primary text-white flex items-center justify-center font-black text-2xl shadow-md">
                    {team.avatar}
                </div>
                <div>
                    <h2 className="text-2xl font-black text-md-on-surface">{team.name}</h2>
                    <p className="text-md-on-surface-variant font-medium">{team.specialization} Unit</p>
                </div>
            </div>

            <div className="aspect-video w-full bg-md-surface-variant/20 rounded-2xl border border-md-outline/10 mb-6 relative overflow-hidden group">
                <div className="absolute inset-0 bg-[url('https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png')] bg-cover opacity-60"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-4 h-4 bg-md-primary rounded-full ring-4 ring-white shadow-lg animate-pulse relative">
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white px-2 py-1 rounded-md text-[10px] font-bold shadow-sm whitespace-nowrap">
                            Live Position
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-md-surface-variant/10 rounded-xl">
                    <p className="text-xs text-md-on-surface-variant font-bold uppercase">Unit Efficiency</p>
                    <p className="text-lg font-black text-md-on-surface">{team.efficiency || 100}%</p>
                </div>
                <div className="p-4 bg-md-surface-variant/10 rounded-xl">
                    <p className="text-xs text-md-on-surface-variant font-bold uppercase">Status</p>
                    <p className={`text-lg font-black uppercase ${team.status === 'available' ? 'text-emerald-600' :
                            team.status === 'busy' ? 'text-orange-600' : 'text-gray-500'
                        }`}>
                        {team.status || 'Unknown'}
                    </p>
                </div>
            </div>

            <div className="bg-md-secondary-container/20 p-5 rounded-2xl border border-md-secondary-container mb-auto">
                <h3 className="font-bold text-md-on-secondary-container mb-3 flex items-center gap-2">
                    <span>📍</span> Current Mission
                </h3>
                {team.currentTask ? (
                    <>
                        <p className="font-bold text-md-on-surface mb-1">{team.currentTask}</p>
                        <p className="text-xs text-md-on-surface-variant mb-4">In Progress</p>

                        <button
                            onClick={() => onComplete(team)}
                            className="w-full py-3 mb-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
                        >
                            <span>✅</span> Complete Mission
                        </button>

                        <div className="flex gap-2">
                            <button className="flex-1 py-2 bg-white rounded-lg text-xs font-bold text-md-on-surface border border-md-outline/10 hover:bg-md-surface-variant transition-colors">
                                View Report
                            </button>
                            <button className="flex-1 py-2 bg-md-primary text-white rounded-lg text-xs font-bold hover:bg-water-700 transition-colors shadow-sm">
                                Message
                            </button>
                        </div>
                    </>
                ) : (
                    <p className="text-sm text-md-on-surface-variant italic">No active mission. Team is standing by.</p>
                )}
            </div>

            <div className="mt-6 pt-6 border-t border-md-outline/10 flex gap-3">
                <button className="flex-1 py-3 rounded-xl border-2 border-md-primary/10 text-md-primary font-bold hover:bg-md-primary/5 transition-colors">
                    History
                </button>
                <button
                    onClick={startAssign}
                    disabled={team.status !== 'available'}
                    className="flex-1 py-3 rounded-xl bg-md-on-surface text-white font-bold hover:opacity-90 transition-opacity shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {team.status === 'available' ? 'Assign Task' : 'Unavailable'}
                </button>
            </div>
        </div>
    );
};

export default TeamDetailsPanel;
