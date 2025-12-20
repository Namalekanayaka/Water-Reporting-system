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
        <div className="w-full bg-[#fbfbfd] min-h-screen p-6 md:p-12">
            <div className="max-w-[1400px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div>
                        <span className="text-water-600 font-bold uppercase tracking-widest text-[13px] mb-3 block">Geospatial Data</span>
                        <h1 className="text-[40px] md:text-[56px] font-black tracking-tight text-gray-900 leading-none">
                            Universal Map.
                        </h1>
                        <p className="text-[19px] text-gray-400 font-medium mt-4">Precision tracking of regional water infrastructure status.</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="px-6 py-4 bg-white rounded-3xl border border-gray-100 shadow-sm">
                            <span className="text-[11px] font-black uppercase tracking-widest text-gray-300 block mb-1">Active Markers</span>
                            <span className="text-2xl font-black text-gray-900">{reports.length}</span>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="w-full h-[600px] bg-white rounded-[40px] flex items-center justify-center border border-gray-50 shadow-apple">
                        <div className="animate-spin h-8 w-8 border-4 border-water-600 border-t-transparent rounded-full"></div>
                    </div>
                ) : (
                    <div className="space-y-8">
                        <ReportsMap
                            reports={reports}
                            height="650px"
                        />
                        <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-apple flex flex-wrap gap-8 items-center justify-center">
                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                                <span className="text-[13px] font-bold text-gray-500 uppercase tracking-widest">Pending Review</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                                <span className="text-[13px] font-bold text-gray-500 uppercase tracking-widest">Dispatching Team</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                                <span className="text-[13px] font-bold text-gray-500 uppercase tracking-widest">Resolution Confirmed</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MapView;
