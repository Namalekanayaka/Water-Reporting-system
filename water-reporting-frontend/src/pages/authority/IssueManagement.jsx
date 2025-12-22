import React, { useState, useEffect } from 'react';
import ReportTable from '../../components/reports/ReportTable';
import ReportDetailsModal from '../../components/reports/ReportDetailsModal';
import { getAllReports } from '../../services/api/reports';

const IssueManagement = () => {
    const [selectedReport, setSelectedReport] = useState(null);
    const [reports, setReports] = useState([]);

    useEffect(() => {
        const fetchReports = async () => {
            const { success, reports: data } = await getAllReports();
            if (success) {
                const formattedReports = data.map(r => ({
                    ...r,
                    title: r.type ? r.type.replace(/_/g, ' ').toUpperCase() : 'Report #' + r.id.substring(0, 4),
                    location: r.location || { address: 'Unknown' },
                    timestamp: r.createdAt ? new Date(r.createdAt).toLocaleString() : 'N/A',
                    aiSeverityScore: r.aiSeverityScore || (r.priority === 'critical' ? 0.9 : 0.5)
                }));
                setReports(formattedReports);
            }
        };
        fetchReports();
    }, []);

    const handleUpdateStatus = (id, newStatus) => {
        setReports(reports.map(r => r.id === id ? { ...r, status: newStatus } : r));
        if (selectedReport && selectedReport.id === id) {
            setSelectedReport({ ...selectedReport, status: newStatus });
        }
    };

    return (
        <div className="w-full bg-md-surface min-h-screen p-4 md:p-6 lg:p-8 animate-in fade-in zoom-in duration-500">
            <div className="max-w-[1600px] mx-auto h-[calc(100vh-4rem)] flex flex-col">
                <div className="mb-8 shrink-0">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="w-2 h-2 rounded-full bg-md-primary"></span>
                        <span className="text-md-primary font-black uppercase tracking-[0.2em] text-[11px]">Authority Console</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-md-on-surface tracking-tighter">Issue Pulse.</h1>
                </div>

                <div className="flex-1 min-h-0">
                    <ReportTable
                        reports={reports}
                        onReportClick={setSelectedReport}
                    />
                </div>
            </div>

            {selectedReport && (
                <ReportDetailsModal
                    report={selectedReport}
                    onClose={() => setSelectedReport(null)}
                    onUpdateStatus={handleUpdateStatus}
                />
            )}
        </div>
    );
};

export default IssueManagement;
