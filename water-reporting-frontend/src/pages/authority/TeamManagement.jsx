import React, { useState } from 'react';
import TeamCard from '../../components/teams/TeamCard';
import TeamStats from '../../components/teams/TeamStats';
import TeamDetailsPanel from '../../components/teams/TeamDetailsPanel';

const TeamManagement = () => {
    const [selectedTeam, setSelectedTeam] = useState(null);

    const teams = [
        { id: 1, name: 'Alpha Squad', avatar: 'A', status: 'busy', efficiency: 94, specialization: 'Rapid Response', currentTask: 'Major Leak Repair at Sector 4' },
        { id: 2, name: 'Beta Unit', avatar: 'B', status: 'available', efficiency: 88, specialization: 'Infrastructure', currentTask: null },
        { id: 3, name: 'Gamma Crew', avatar: 'G', status: 'offline', efficiency: 76, specialization: 'Maintenance', currentTask: null },
        { id: 4, name: 'Delta Force', avatar: 'D', status: 'busy', efficiency: 98, specialization: 'Emergency', currentTask: 'Contamination Control in Zone B' },
        { id: 5, name: 'Echo Team', avatar: 'E', status: 'available', efficiency: 91, specialization: 'Inspection', currentTask: null },
        { id: 6, name: 'Omega Squad', avatar: 'O', status: 'available', efficiency: 85, specialization: 'General Repairs', currentTask: null },
    ];

    return (
        <div className="w-full bg-md-surface min-h-screen p-4 md:p-6 lg:p-8 animate-in fade-in zoom-in duration-500">
            <div className="max-w-[1600px] mx-auto h-[calc(100vh-4rem)] flex flex-col">
                {/* Header */}
                <div className="mb-8 shrink-0">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="w-2 h-2 rounded-full bg-md-primary"></span>
                        <span className="text-md-primary font-black uppercase tracking-[0.2em] text-[11px]">Authority Console</span>
                    </div>
                    <div className="flex justify-between items-end">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-md-on-surface tracking-tighter">Team Flow.</h1>
                        <button className="hidden md:block bg-md-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-water-700 transition-colors shadow-md shadow-md-primary/20">
                            + New Unit
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="mb-8 shrink-0">
                    <TeamStats />
                </div>

                {/* Main Content */}
                <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                    {/* Left: Team Grid */}
                    <div className="lg:col-span-2 overflow-y-auto pr-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {teams.map((team) => (
                                <TeamCard
                                    key={team.id}
                                    team={team}
                                    onSelect={setSelectedTeam}
                                    isSelected={selectedTeam?.id === team.id}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right: Details Panel */}
                    <div className="lg:col-span-1 min-h-[500px]">
                        <TeamDetailsPanel team={selectedTeam} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeamManagement;
