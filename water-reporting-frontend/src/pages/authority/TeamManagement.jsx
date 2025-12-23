import React, { useState, useEffect } from 'react';
import TeamCard from '../../components/teams/TeamCard';
import TeamStats from '../../components/teams/TeamStats';
import TeamDetailsPanel from '../../components/teams/TeamDetailsPanel';
import { getTeams, addTeam, updateTeamStatus } from '../../services/api/authority';
import { getAllReports, updateReportStatus } from '../../services/api/reports';

const TeamManagement = () => {
    const [teams, setTeams] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTeam, setNewTeam] = useState({ name: '', specialization: 'General', status: 'available' });

    useEffect(() => {
        loadTeams();
    }, []);

    const loadTeams = async () => {
        const { success, teams: data } = await getTeams();
        if (success) setTeams(data);
    };

    const handleCreateTeam = async (e) => {
        e.preventDefault();
        const res = await addTeam({
            ...newTeam,
            avatar: newTeam.name.charAt(0).toUpperCase(),
            efficiency: 100, // Default start efficiency
            currentTask: ''
        });
        if (res.success) {
            setIsModalOpen(false);
            setNewTeam({ name: '', specialization: 'General', status: 'available' });
            loadTeams();
        } else {
            alert('Failed to create team');
        }
    };

    const handleAssignTask = async (team, reportId, reportTitle) => {
        if (!team || !reportId) return;
        try {
            // 1. Update Report -> Assigned Team (Set to In Progress)
            await updateReportStatus(reportId, 'in_progress', 'Manual Dispatch from Console', team.id);

            // 2. Update Team -> Busy
            const taskDesc = `Responding to: ${reportTitle || 'Emergency'}`;
            await updateTeamStatus(team.id, 'busy', taskDesc);

            // 3. Refresh Data
            loadTeams();

            // Optional: Close modal or visual feedback
        } catch (err) {
            console.error("Dispatch Failed", err);
            alert("Failed to dispatch team.");
        }
    };

    const handleCompleteTask = async (team) => {
        if (!confirm(`Mark mission as complete for ${team.name}?`)) return;

        try {
            // 1. Find the active report for this team
            const { success, reports } = await getAllReports();
            if (success) {
                const activeReport = reports.find(r => r.assignedTeamId === team.id && r.status === 'in_progress');
                if (activeReport) {
                    await updateReportStatus(activeReport.id, 'resolved', 'Mission Completed by Team');
                }
            }

            // 2. Free the Team
            await updateTeamStatus(team.id, 'available', '');

            // 3. Refresh
            loadTeams();
        } catch (err) {
            console.error(err);
            alert("Failed to complete task.");
        }
    };

    return (
        <div className="w-full bg-md-surface min-h-screen p-4 md:p-6 lg:p-8 animate-in fade-in zoom-in duration-500 relative">

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl animate-in zoom-in-95">
                        <h2 className="text-2xl font-bold mb-4">Create New Unit</h2>
                        <form onSubmit={handleCreateTeam} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Team Name</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full p-2 border rounded-lg"
                                    value={newTeam.name}
                                    onChange={e => setNewTeam({ ...newTeam, name: e.target.value })}
                                    placeholder="e.g. Omega Squad"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Specialization</label>
                                <select
                                    className="w-full p-2 border rounded-lg"
                                    value={newTeam.specialization}
                                    onChange={e => setNewTeam({ ...newTeam, specialization: e.target.value })}
                                >
                                    <option value="General">General</option>
                                    <option value="Rapid Response">Rapid Response</option>
                                    <option value="Infrastructure">Infrastructure</option>
                                    <option value="Emergency">Emergency</option>
                                </select>
                            </div>
                            <div className="flex justify-end gap-2 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 rounded-lg bg-md-primary text-white hover:bg-blue-700"
                                >
                                    Create Team
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="max-w-[1600px] mx-auto min-h-screen lg:min-h-0 lg:h-[calc(100vh-4rem)] flex flex-col">
                {/* Header */}
                <div className="mb-8 shrink-0">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="w-2 h-2 rounded-full bg-md-primary"></span>
                        <span className="text-md-primary font-black uppercase tracking-[0.2em] text-[11px]">Authority Console</span>
                    </div>
                    <div className="flex justify-between items-end">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-md-on-surface tracking-tighter">Team Flow.</h1>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="hidden md:block bg-md-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-water-700 transition-colors shadow-md shadow-md-primary/20"
                        >
                            + New Unit
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="mb-8 shrink-0">
                    <TeamStats teams={teams} />
                </div>

                {/* Main Content */}
                <div className="flex-1 lg:min-h-0 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                    {/* Left: Team Grid */}
                    <div className="lg:col-span-2 lg:overflow-y-auto pr-0 lg:pr-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {teams.map((team) => (
                                <TeamCard
                                    key={team.id}
                                    team={team}
                                    onSelect={setSelectedTeam}
                                    isSelected={selectedTeam?.id === team.id}
                                />
                            ))}
                            {teams.length === 0 && <p className="col-span-2 text-center text-gray-400">No teams found. Create one!</p>}
                        </div>
                    </div>

                    {/* Right: Details Panel */}
                    <div className="lg:col-span-1 min-h-[500px]">
                        <TeamDetailsPanel team={selectedTeam} onAssign={handleAssignTask} onComplete={handleCompleteTask} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeamManagement;
