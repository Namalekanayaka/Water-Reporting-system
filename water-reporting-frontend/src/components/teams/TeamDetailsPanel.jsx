import React from 'react';

const TeamDetailsPanel = ({ team }) => {
    if (!team) return (
        <div className="h-full flex flex-col items-center justify-center text-center p-10 text-md-on-surface-variant/50 bg-md-surface-variant/5 rounded-[32px] border-2 border-dashed border-md-outline/10">
            <span className="text-4xl mb-4 grayscale opacity-50">👥</span>
            <p className="font-bold">Select a team to view details</p>
        </div>
    );

    return (
        <div className="h-full bg-md-surface rounded-[32px] border border-md-outline/10 p-6 flex flex-col animate-in fade-in slide-in-from-right-4 duration-300">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-md-primary text-white flex items-center justify-center font-black text-2xl shadow-md">
                    {team.avatar}
                </div>
                <div>
                    <h2 className="text-2xl font-black text-md-on-surface">{team.name}</h2>
                    <p className="text-md-on-surface-variant font-medium">{team.specialization} Unit</p>
                </div>
            </div>

            {/* Map Placeholder */}
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
                    <p className="text-xs text-md-on-surface-variant font-bold uppercase">Current Speed</p>
                    <p className="text-lg font-black text-md-on-surface">42 km/h</p>
                </div>
                <div className="p-4 bg-md-surface-variant/10 rounded-xl">
                    <p className="text-xs text-md-on-surface-variant font-bold uppercase">Battery</p>
                    <p className="text-lg font-black text-emerald-600">85%</p>
                </div>
            </div>

            {/* Current Assignment */}
            <div className="bg-md-secondary-container/20 p-5 rounded-2xl border border-md-secondary-container mb-auto">
                <h3 className="font-bold text-md-on-secondary-container mb-3 flex items-center gap-2">
                    <span>📍</span> Current Mission
                </h3>
                {team.currentTask ? (
                    <>
                        <p className="font-bold text-md-on-surface mb-1">{team.currentTask}</p>
                        <p className="text-xs text-md-on-surface-variant mb-4">Assigned 24 mins ago</p>
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

            {/* Actions */}
            <div className="mt-6 pt-6 border-t border-md-outline/10 flex gap-3">
                <button className="flex-1 py-3 rounded-xl border-2 border-md-primary/10 text-md-primary font-bold hover:bg-md-primary/5 transition-colors">
                    History
                </button>
                <button className="flex-1 py-3 rounded-xl bg-md-on-surface text-md-inverse-on-surface font-bold hover:opacity-90 transition-opacity shadow-md">
                    Assign Task
                </button>
            </div>
        </div>
    );
};

export default TeamDetailsPanel;
