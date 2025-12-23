import React, { useState, useEffect } from 'react';
import ReportTable from '../../components/reports/ReportTable';
import ReportDetailsModal from '../../components/reports/ReportDetailsModal';
import { getAllReports, updateReportStatus } from '../../services/api/reports';
import { updateTeamStatus } from '../../services/api/authority';

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
                    aiSeverityScore: r.aiSeverityScore || (() => {
                        const p = (r.priority || 'medium').toLowerCase();
                        if (p === 'critical') return 0.95;
                        if (p === 'high') return 0.8;
                        if (p === 'medium') return 0.5;
                        return 0.2;
                    })()
                }));
                setReports(formattedReports);
            }
        };
        fetchReports();
    }, []);

    const handleUpdateStatus = async (id, newStatus, notes = '', teamId = null) => {
        // 1. Optimistic UI Update
        const updatedReports = reports.map(r =>
            r.id === id
                ? { ...r, status: newStatus, assignedTeamId: teamId || r.assignedTeamId }
                : r
        );
        setReports(updatedReports);

        if (selectedReport && selectedReport.id === id) {
            setSelectedReport({
                ...selectedReport,
                status: newStatus,
                assignedTeamId: teamId || selectedReport.assignedTeamId
            });
        }

        try {
            // 2. Persist Report Update
            await updateReportStatus(id, newStatus, notes, teamId);

            // 3. If Team Assigned -> Dispatch Team (Update Team Status)
            if (teamId) {
                const report = reports.find(r => r.id === id);
                const taskLocation = report?.location?.address || 'Site';
                const taskDesc = `Responding to ${report?.title || 'Issue'} at ${taskLocation}`;

                await updateTeamStatus(teamId, 'busy', taskDesc);
            }
        } catch (error) {
            console.error("Failed to update status/dispatch team:", error);
        }
    };

    return (
        <div className="w-full bg-md-surface min-h-screen p-4 md:p-6 lg:p-8 animate-in fade-in zoom-in duration-500">
            <div className="max-w-[1600px] mx-auto min-h-screen lg:min-h-0 lg:h-[calc(100vh-6rem)] flex flex-col">
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
