import React, { useState, useEffect } from 'react';
import ReportsMap from '../../components/maps/ReportsMap';
import { getAllReports } from '../../services/api/reports';

const MapView = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await getAllReports();
                if (response.success) {
                    setReports(response.reports);
                }
            } catch (error) {
                console.error('Failed to fetch reports for map:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchReports();
    }, []);

    return (
        <div className="w-full bg-md-surface min-h-screen">
            <div className="max-w-[1400px] mx-auto py-12 md:py-24 px-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <div>
                        <span className="text-md-primary font-black uppercase tracking-[0.2em] text-[11px] mb-3 block">Geospatial Intelligence</span>
                        <h1 className="text-[40px] md:text-[64px] font-black tracking-tight text-md-on-surface leading-none">
                            Universal Map.
                        </h1>
                        <p className="text-[19px] text-md-on-surface-variant font-medium mt-4">Precision tracking of real-time infrastructure dynamics across the network.</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="px-8 py-4 bg-white rounded-[24px] border border-md-outline/10 shadow-md-1">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-md-on-surface-variant/40 block mb-1">Live Markers</span>
                            <span className="text-3xl font-black text-md-primary">{reports.length}</span>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="w-full h-[650px] bg-white rounded-[32px] flex items-center justify-center border border-md-outline/5 shadow-md-1">
                        <div className="animate-spin h-10 w-10 border-4 border-md-primary border-t-transparent rounded-full"></div>
                    </div>
                ) : (
                    <div className="space-y-10">
                        <div className="rounded-[32px] overflow-hidden border border-md-outline/10 shadow-md-2">
                            <ReportsMap
                                reports={reports}
                                height="650px"
                            />
                        </div>
                        <div className="bg-md-surface-variant/20 rounded-[32px] p-8 border border-md-outline/10 flex flex-wrap gap-12 items-center justify-center">
                            <div className="flex items-center gap-4 group cursor-default">
                                <div className="w-3.5 h-3.5 rounded-full bg-md-error shadow-sm group-hover:scale-125 transition-transform"></div>
                                <span className="text-[13px] font-black text-md-on-surface-variant uppercase tracking-widest">Pending Review</span>
                            </div>
                            <div className="flex items-center gap-4 group cursor-default">
                                <div className="w-3.5 h-3.5 rounded-full bg-md-secondary shadow-sm group-hover:scale-125 transition-transform"></div>
                                <span className="text-[13px] font-black text-md-on-surface-variant uppercase tracking-widest">Dispatching Team</span>
                            </div>
                            <div className="flex items-center gap-4 group cursor-default">
                                <div className="w-3.5 h-3.5 rounded-full bg-md-primary shadow-sm group-hover:scale-125 transition-transform"></div>
                                <span className="text-[13px] font-black text-md-on-surface-variant uppercase tracking-widest">System Resolved</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MapView;
