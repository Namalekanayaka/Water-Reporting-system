import React from 'react';
import { useNavigate } from 'react-router-dom';

const ResourceAllocation = ({ teams = [] }) => {
    const navigate = useNavigate();

    const getStatusColor = (status) => {
        switch (status) {
            case 'available': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
            case 'busy': return 'bg-amber-50 text-amber-700 border-amber-100';
            default: return 'bg-md-surface-variant/30 text-md-on-surface-variant';
        }
    };

    return (
        <div className="bg-md-surface-variant/20 backdrop-blur-sm rounded-[28px] border border-md-outline/10 p-6 flex flex-col h-[500px] lg:h-full">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-xl font-black text-md-on-surface tracking-tight">Resource Allocation</h3>
                    <p className="text-xs text-md-on-surface-variant font-bold uppercase tracking-widest mt-1">Team Availability</p>
                </div>
                <button
                    onClick={() => navigate('/authority/teams')}
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-md-surface hover:bg-md-primary hover:text-white text-md-on-surface transition-all duration-300 shadow-sm border border-md-outline/5"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                </button>
            </div>

            <div className="space-y-3">
                {teams.map((team) => (
                    <div key={team.id} className="flex items-center gap-4 bg-md-surface p-3 rounded-[16px] border border-md-outline/5 hover:border-md-primary/20 transition-all group">
                        <div className="relative">
                            <div className="w-12 h-12 rounded-xl bg-md-secondary-container text-md-on-secondary-container flex items-center justify-center font-black text-sm shadow-inner">
                                {team.avatar}
                            </div>
                            <div className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-[3px] border-md-surface ${team.status === 'available' ? 'bg-emerald-500' :
                                team.status === 'busy' ? 'bg-amber-500' : 'bg-slate-400'
                                }`}></div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-bold text-md-on-surface text-sm truncate group-hover:text-md-primary transition-colors">{team.name}</p>
                            <p className="text-xs text-md-on-surface-variant truncate font-medium">{team.currentTask || 'No active task'}</p>
                        </div>
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider border ${getStatusColor(team.status)}`}>
                            {team.status}
                        </span>
                    </div>
                ))}
            </div>

            <button
                onClick={() => navigate('/authority/teams')}
                className="w-full mt-6 py-3.5 rounded-xl border border-md-outline/10 text-xs font-bold uppercase tracking-wider text-md-on-surface-variant hover:bg-md-surface hover:text-md-primary hover:border-md-primary/20 transition-all bg-white/50">
                Manage Schedule
            </button>
        </div>
    );
};

export default ResourceAllocation;
