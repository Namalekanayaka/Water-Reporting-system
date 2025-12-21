import React, { useState } from 'react';
import ReportTable from '../../components/reports/ReportTable';
import ReportDetailsModal from '../../components/reports/ReportDetailsModal';

const IssueManagement = () => {
    const [selectedReport, setSelectedReport] = useState(null);
    const [reports, setReports] = useState([
        {
            id: '1024',
            title: 'Major Pipe Burst - Main St',
            type: 'Pipeline Leakage',
            description: 'Massive water leak observed near the central junction. Water is flooding the street and causing traffic jams. Residents report low pressure in surrounding areas.',
            location: { address: '123 Main St, Bangalore' },
            priority: 'critical',
            aiSeverityScore: 0.95,
            status: 'pending',
            timestamp: 'Today, 10:30 AM'
        },
        {
            id: '1023',
            title: 'Contaminated Water Supply',
            type: 'Water Quality',
            description: 'Water appearing turbid and smelling of sewage in Sector 4. Multiple households affected.',
            location: { address: 'Sector 4, Indiranagar' },
            priority: 'high',
            aiSeverityScore: 0.88,
            status: 'in_progress',
            timestamp: 'Today, 09:15 AM'
        },
        {
            id: '1022',
            title: 'Low Pressure Alert',
            type: 'Supply Issue',
            description: 'Consistent low water pressure observed for the past 3 days during morning hours.',
            location: { address: 'Palm Grove Apts' },
            priority: 'medium',
            aiSeverityScore: 0.65,
            status: 'pending',
            timestamp: 'Yesterday, 06:45 PM'
        },
        {
            id: '1021',
            title: 'Sewage Leakage',
            type: 'Sanitation',
            description: 'Sewage overflowing from manhole cover near the market entrance.',
            location: { address: 'Market Road' },
            priority: 'high',
            aiSeverityScore: 0.92,
            status: 'resolved',
            timestamp: 'Yesterday, 04:20 PM'
        },
        {
            id: '1020',
            title: 'No Water Supply',
            type: 'Supply Issue',
            description: 'Total lack of water supply in Layout 5 for the last 24 hours without prior notice.',
            location: { address: 'Layout 5' },
            priority: 'medium',
            aiSeverityScore: 0.78,
            status: 'pending',
            timestamp: '20 Dec, 08:00 AM'
        },
        {
            id: '1019',
            title: 'Leaking Public Tap',
            type: 'Wastage',
            description: 'Public tap at the park entrance has been leaking continuously.',
            location: { address: 'Central Park' },
            priority: 'low',
            aiSeverityScore: 0.35,
            status: 'closed',
            timestamp: '19 Dec, 11:30 AM'
        },
    ]);

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
