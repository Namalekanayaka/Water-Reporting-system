import React from 'react';
import AuthorityMap from '../../components/maps/AuthorityMap';

const GlobalMap = () => {
    // Mock Data
    const reports = [
        { id: '1024', title: 'Pipe Burst', type: 'Leakage', priority: 'critical', status: 'pending', location: { lat: 12.9716, lng: 77.5946, address: 'MG Road' } },
        { id: '1023', title: 'Contamination', type: 'Quality', priority: 'high', status: 'pending', location: { lat: 12.9352, lng: 77.6245, address: 'Koramangala' } },
        { id: '1021', title: 'Sewage Leak', type: 'Sanitation', priority: 'medium', status: 'resolved', location: { lat: 12.9279, lng: 77.6271, address: 'Indiranagar' } },
        { id: '1020', title: 'Low Pressure', type: 'Supply', priority: 'low', status: 'in_progress', location: { lat: 12.9915, lng: 77.5709, address: 'Malleshwaram' } },
    ];

    const teams = [
        { id: 1, name: 'Alpha Squad', status: 'Busy', battery: 85, location: { lat: 12.9750, lng: 77.6000 } },
        { id: 2, name: 'Beta Unit', status: 'Available', battery: 92, location: { lat: 12.9300, lng: 77.6200 } },
        { id: 3, name: 'Gamma Crew', status: 'Offline', battery: 0, location: { lat: 12.9900, lng: 77.5600 } },
    ];

    const sensors = [
        { id: 'S-101', flowRate: 450, pressure: 65, location: { lat: 12.9600, lng: 77.5800 } },
        { id: 'S-102', flowRate: 420, pressure: 62, location: { lat: 12.9400, lng: 77.6100 } },
        { id: 'S-103', flowRate: 150, pressure: 25, location: { lat: 12.9800, lng: 77.5900 } }, // Low pressure anomaly
    ];

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
                            <button className="px-4 py-2 bg-white border border-md-outline/10 rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm hover:bg-md-primary/5 transition-colors">
                                Export Data
                            </button>
                            <button className="px-4 py-2 bg-md-primary text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-md hover:bg-water-700 transition-colors">
                                + Deploy Unit
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex-1 min-h-0">
                    <AuthorityMap
                        reports={reports}
                        teams={teams}
                        sensors={sensors}
                    />
                </div>
            </div>
        </div>
    );
};

export default GlobalMap;
