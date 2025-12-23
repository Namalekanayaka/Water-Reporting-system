import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthorityMap from '../../components/maps/AuthorityMap';
import { getAllReports } from '../../services/api/reports';
import { getTeams } from '../../services/api/authority';

const GlobalMap = () => {
    const [reports, setReports] = useState([]);
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Mock Sensors (since we don't have a backend for this yet)
    const [sensors] = useState([
        { id: 'S-101', flowRate: 450, pressure: 65, location: { lat: 6.9300, lng: 79.8600 } }, // Colombo Central
        { id: 'S-102', flowRate: 420, pressure: 62, location: { lat: 6.9100, lng: 79.8800 } }, // Borella Area
        { id: 'S-103', flowRate: 150, pressure: 25, location: { lat: 6.9500, lng: 79.8500 } }, // Pettah Area
    ]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [reportsRes, teamsRes] = await Promise.all([
                    getAllReports(),
                    getTeams()
                ]);

                if (reportsRes.success) {
                    setReports(reportsRes.reports.filter(r => r.location && r.location.lat && r.location.lng));
                }

                if (teamsRes.success) {
                    // Filter teams that have valid location data (or mock it if missing for now)
                    // For this demo, we can assign random locations if missing, or specific ones. 
                    // But assume teams might not have location in DB yet.
                    // We'll map them to a default if missing or just filter.
                    // For better "Real/Demo" feel transparency:
                    const validTeams = teamsRes.teams.map(t => ({
                        ...t,
                        // Generating random points around Colombo/Sri Lanka
                        location: t.location || {
                            lat: 6.9271 + (Math.random() - 0.5) * 0.1,
                            lng: 79.8612 + (Math.random() - 0.5) * 0.1
                        },
                        battery: t.battery || 85 // Mock battery
                    }));
                    setTeams(validTeams);
                }
            } catch (error) {
                console.error("Failed to load map data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="w-full bg-md-surface min-h-screen p-4 md:p-6 lg:p-8 animate-in fade-in zoom-in duration-500">
            <div className="max-w-[1600px] mx-auto h-[calc(100vh-4rem)] flex flex-col">
                <div className="mb-8 shrink-0">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="w-2 h-2 rounded-full bg-md-primary"></span>
                        <span className="text-md-primary font-black uppercase tracking-[0.2em] text-[11px]">Authority Console</span>
                    </div>
                    <div className="flex justify-between items-end">
                        <div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-md-on-surface tracking-tighter">Global Map.</h1>
                            <p className="text-md-on-surface-variant font-medium mt-2 max-w-xl">
                                Real-time geospatial oversight of infrastructure, active units, and critical incidents.
                            </p>
                        </div>
                        <div className="hidden md:flex gap-2">
                            <button
                                onClick={() => {
                                    // 1. Convert Data to CSV
                                    const csvRows = [];
                                    // Header
                                    csvRows.push(['ID', 'Title', 'Type', 'Priority', 'Status', 'Latitude', 'Longitude', 'Address'].join(','));

                                    // Body
                                    reports.forEach(r => {
                                        const clean = (text) => `"${(text || '').replace(/"/g, '""')}"`;
                                        csvRows.push([
                                            clean(r.id),
                                            clean(r.title),
                                            clean(r.type),
                                            clean(r.priority),
                                            clean(r.status),
                                            r.location?.lat || '',
                                            r.location?.lng || '',
                                            clean(r.location?.address)
                                        ].join(','));
                                    });

                                    // 2. Trigger Download
                                    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
                                    const url = window.URL.createObjectURL(blob);
                                    const a = document.createElement('a');
                                    a.href = url;
                                    a.download = `water_reports_export_${new Date().toISOString().split('T')[0]}.csv`;
                                    a.click();
                                    window.URL.revokeObjectURL(url);
                                }}
                                className="px-4 py-2 bg-white border border-md-outline/10 rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm hover:bg-md-primary/5 transition-colors"
                            >
                                Export Data
                            </button>
                            <button
                                onClick={() => navigate('/authority/teams')}
                                className="px-4 py-2 bg-md-primary text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-md hover:bg-water-700 transition-colors"
                            >
                                + Deploy Unit
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex-1 min-h-0 bg-white rounded-[32px] overflow-hidden border border-md-outline/10 relative">
                    {loading ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                            <p className="text-md-on-surface-variant font-bold animate-pulse">Syncing Geospatial Data...</p>
                        </div>
                    ) : (
                        <AuthorityMap
                            reports={reports}
                            teams={teams}
                            sensors={sensors}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default GlobalMap;
