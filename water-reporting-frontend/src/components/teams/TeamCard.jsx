import React from 'react';

const TeamCard = ({ team, onSelect, isSelected }) => {
    const statusColors = {
        available: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        busy: 'bg-amber-100 text-amber-800 border-amber-200',
        offline: 'bg-slate-100 text-slate-600 border-slate-200'
    };

    return (
        <div
            onClick={() => onSelect(team)}
            className={`
                p-5 rounded-[24px] border cursor-pointer transition-all duration-300 group
                ${isSelected
                    ? 'bg-md-primary/5 border-md-primary ring-1 ring-md-primary shadow-md'
                    : 'bg-md-surface border-md-outline/10 hover:border-md-primary/50 hover:shadow-md'
                }
            `}
        >
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-md-secondary-container text-md-on-secondary-container flex items-center justify-center font-black text-lg shadow-sm">
                        {team.avatar}
                    </div>
                    <div>
                        <h3 className="font-bold text-md-on-surface text-lg">{team.name}</h3>
                        <p className="text-xs text-md-on-surface-variant font-medium">{team.specialization}</p>
                    </div>
                </div>
                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border ${statusColors[team.status]}`}>
                    {team.status}
                </span>
            </div>

            <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                    <span className="text-md-on-surface-variant">Efficiency</span>
                    <span className="font-bold text-md-primary">{team.efficiency}%</span>
                </div>
                <div className="w-full bg-md-surface-variant/30 rounded-full h-1.5 overflow-hidden">
                    <div
                        className="bg-md-primary h-full rounded-full transition-all duration-500"
                        style={{ width: `${team.efficiency}%` }}
                    ></div>
                </div>

                <div className="pt-3 border-t border-md-outline/5 mt-3">
                    <p className="text-[10px] font-bold text-md-on-surface-variant uppercase tracking-wider mb-1">Current Task</p>
                    <p className="text-sm font-medium text-md-on-surface truncate">
                        {team.currentTask || 'No active assignment'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TeamCard;
