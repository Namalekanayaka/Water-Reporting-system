import React from 'react';
import { useNavigate } from 'react-router-dom';

const ResourceAllocation = ({ teams = [] }) => {
    const navigate = useNavigate();

    const getStatusColor = (status) => {
        switch (status) {
            case 'available': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
            case 'busy': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
            default: return 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-400';
        }
    };

    return (
        <div className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-md rounded-3xl shadow-sm border border-white/50 dark:border-slate-700/50 p-6 flex flex-col h-full">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-xl font-black text-md-on-surface">Resource Allocation</h3>
                    <p className="text-xs text-md-on-surface-variant font-medium mt-1">Team Availability</p>
                </div>
                <button
                    onClick={() => navigate('/authority/teams')}
                    className="w-8 h-8 flex items-center justify-center rounded-xl bg-md-surface-variant/50 hover:bg-md-primary/10 text-md-on-surface-variant hover:text-md-primary transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                </button>
            </div>

            <div className="space-y-4">
                {teams.map((team) => (
                    <div key={team.id} className="flex items-center gap-3">
                        <div className="relative">
                            <div className="w-10 h-10 rounded-xl bg-md-secondary-container text-md-on-secondary-container flex items-center justify-center font-bold text-sm">
                                {team.avatar}
                            </div>
                            <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white dark:border-slate-800 ${team.status === 'available' ? 'bg-emerald-500' :
                                    team.status === 'busy' ? 'bg-amber-500' : 'bg-slate-400'
                                }`}></div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-bold text-md-on-surface text-sm truncate">{team.name}</p>
                            <p className="text-xs text-md-on-surface-variant truncate">{team.currentTask || 'No active task'}</p>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-1 rounded-lg uppercase tracking-wider ${getStatusColor(team.status)}`}>
                            {team.status}
                        </span>
                    </div>
                ))}
            </div>

            <button className="w-full mt-6 py-3 rounded-xl border border-md-outline/10 text-sm font-bold text-md-on-surface-variant hover:bg-md-surface hover:text-md-primary transition-all">
                Manage Schedule
            </button>
        </div>
    );
};

export default ResourceAllocation;
