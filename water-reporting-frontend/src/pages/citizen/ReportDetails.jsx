import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getReportById } from '../../services/api/reports';
import ReportsMap from '../../components/maps/ReportsMap';
import StatusBadge from '../../components/reports/StatusBadge';
import SeverityBadge from '../../components/reports/SeverityBadge';

const ReportDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReport = async () => {
            if (!id) return;
            try {
                const { success, report } = await getReportById(id);
                if (success) {
                    setReport(report);
                } else {
                    console.error("Report not found");
                }
            } catch (error) {
                console.error("Error fetching report:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchReport();
    }, [id]);

    if (loading) {
        return (
            <div className="w-full h-screen flex items-center justify-center bg-md-surface">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-md-primary border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-md-on-surface-variant font-medium">Loading details...</p>
                </div>
            </div>
        );
    }

    if (!report) {
        return (
            <div className="w-full h-screen flex items-center justify-center bg-md-surface">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-md-on-surface mb-2">Report Not Found</h2>
                    <button
                        onClick={() => navigate('/my-reports')}
                        className="text-md-primary hover:underline font-bold"
                    >
                        Back to My Reports
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-md-surface p-4 md:p-8 animate-in fade-in zoom-in duration-300">
            <div className="max-w-4xl mx-auto">
                {/* Header Navigation */}
                <button
                    onClick={() => navigate('/my-reports')}
                    className="mb-6 flex items-center gap-2 text-md-on-surface-variant hover:text-md-primary font-bold text-sm transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
                    Back to Reports
                </button>

                <div className="bg-white rounded-[32px] border border-md-outline/10 shadow-sm overflow-hidden">
                    {/* Status Header */}
                    <div className="p-6 md:p-10 border-b border-md-outline/5 bg-md-surface-variant/10 flex flex-col md:flex-row justify-between md:items-start gap-6">
                        <div>
                            <div className="flex flex-wrap items-center gap-3 mb-3">
                                <span className="text-xs font-black text-md-on-surface-variant/60 uppercase tracking-widest">Repair Ticket #{report.id.slice(0, 8)}</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-md-outline/20"></span>
                                <span className="text-xs font-bold text-md-on-surface-variant/80">{new Date(report.createdAt).toLocaleString()}</span>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-black text-md-on-surface mb-4 capitalize">
                                {report.type ? report.type.replace(/_/g, ' ') : 'Issue Report'}
                            </h1>
                            <div className="flex gap-3">
                                <StatusBadge status={report.status} />
                                <SeverityBadge severity={report.priority} />
                            </div>
                        </div>

                        {/* Action / State Context */}
                        <div className="text-right hidden md:block">
                            <p className="text-sm font-bold text-md-on-surface-variant mb-1">Current State</p>
                            <p className="text-lg font-black text-md-primary capitalize">{report.status.replace('_', ' ')}</p>
                        </div>
                    </div>

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        {/* Left: Map & Location */}
                        <div className="p-6 md:p-10 border-b lg:border-b-0 lg:border-r border-md-outline/5 space-y-8">
                            <div>
                                <h3 className="text-sm font-black text-md-on-surface uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <span className="text-lg">📍</span> Location Context
                                </h3>
                                <div className="aspect-video w-full bg-md-surface-variant/20 rounded-2xl overflow-hidden border border-md-outline/10 relative group mb-4">
                                    {report.location && report.location.lat ? (
                                        <ReportsMap
                                            reports={[report]}
                                            center={[report.location.lat, report.location.lng]}
                                            zoom={15}
                                            height="100%"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-md-on-surface-variant font-bold text-sm">
                                            Map Unavailable
                                        </div>
                                    )}
                                </div>
                                <div className="p-4 bg-md-surface-variant/10 rounded-xl border border-md-outline/5">
                                    <p className="text-md-on-surface font-medium leading-relaxed">
                                        {report.location?.address || "No address provided"}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-black text-md-on-surface uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <span className="text-lg">📸</span> Evidence
                                </h3>
                                {report.images && report.images.length > 0 ? (
                                    <div className="grid grid-cols-2 gap-3">
                                        {report.images.map((img, idx) => (
                                            <a key={idx} href={img} target="_blank" rel="noopener noreferrer" className="block aspect-square rounded-xl overflow-hidden bg-md-surface-variant/20 border border-md-outline/10 group relative">
                                                <img src={img} alt={`Evidence ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                                    <span className="opacity-0 group-hover:opacity-100 bg-white/90 p-2 rounded-full shadow-sm text-xs font-bold transition-opacity">View</span>
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="py-8 text-center bg-md-surface-variant/5 rounded-xl border border-dashed border-md-outline/10">
                                        <p className="text-sm font-medium text-md-on-surface-variant/60">No images attached.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right: Details & Timeline */}
                        <div className="p-6 md:p-10 bg-md-surface-variant/5">
                            <div className="mb-10">
                                <h3 className="text-sm font-black text-md-on-surface uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <span className="text-lg">📝</span> Description
                                </h3>
                                <p className="text-md-on-surface/80 text-[15px] leading-relaxed font-medium whitespace-pre-wrap">
                                    {report.description}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-sm font-black text-md-on-surface uppercase tracking-wider mb-6 flex items-center gap-2">
                                    <span className="text-lg">⏱️</span> Activity Log
                                </h3>
                                <div className="relative pl-6 border-l-2 border-md-outline/10 space-y-8">
                                    {report.timeline?.map((event, idx) => (
                                        <div key={idx} className="relative">
                                            <span className={`absolute -left-[31px] top-0 w-4 h-4 rounded-full border-2 border-white shadow-sm ${idx === 0 ? 'bg-md-primary ring-4 ring-md-primary/10' : 'bg-md-on-surface-variant/40'}`}></span>
                                            <div>
                                                <p className="text-sm font-black text-md-on-surface capitalize mb-1">
                                                    {event.status.replace('_', ' ')}
                                                </p>
                                                <p className="text-xs font-bold text-md-on-surface-variant/60 uppercase tracking-wider mb-2">
                                                    {new Date(event.timestamp).toLocaleString()}
                                                </p>
                                                {event.notes && (
                                                    <p className="text-sm bg-white p-3 rounded-lg border border-md-outline/5 text-md-on-surface-variant">
                                                        {event.notes}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    )).reverse()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportDetails;
