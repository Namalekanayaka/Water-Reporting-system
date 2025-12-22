import React, { useEffect, useState } from 'react';
import AccessMatrix from '../../components/security/AccessMatrix';
import AuditLogPanel from '../../components/security/AuditLogPanel';
import { getSystemAlerts } from '../../services/api/authority';

const SharedResponsibilities = () => {
    const [auditLogs, setAuditLogs] = useState([]);

    useEffect(() => {
        const fetchLogs = async () => {
            const { success, alerts } = await getSystemAlerts();
            if (success && alerts) {
                // Map alerts to audit format
                const logs = alerts.map(a => ({
                    id: a.id,
                    action: a.message,
                    user: 'System',
                    timestamp: a.createdAt || new Date().toISOString(),
                    status: a.severity || 'info'
                }));
                setAuditLogs(logs);
            }
        };
        fetchLogs();
    }, []);
    return (
        <div className="w-full bg-md-surface min-h-screen p-4 md:p-6 lg:p-8 animate-in fade-in zoom-in duration-500">
            <div className="max-w-[1600px] mx-auto h-[calc(100vh-4rem)] flex flex-col">
                {/* Header */}
                <div className="mb-8 shrink-0">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="w-2 h-2 rounded-full bg-md-primary"></span>
                        <span className="text-md-primary font-black uppercase tracking-[0.2em] text-[11px]">System Governance</span>
                    </div>
                    <div className="flex justify-between items-end">
                        <div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-md-on-surface tracking-tighter">Shared Responsibilities.</h1>
                            <p className="text-md-on-surface-variant font-medium mt-2 max-w-xl">
                                Manage access controls, review security logs, and ensure cross-functional integrity.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                    {/* Left: Access Matrix (2 cols) */}
                    <div className="lg:col-span-2">
                        <AccessMatrix />

                        <div className="mt-8 bg-amber-50 border border-amber-100 p-6 rounded-[24px]">
                            <h4 className="flex items-center gap-2 font-bold text-amber-800 mb-2">
                                <span className="text-xl">⚠️</span> Security Notice
                            </h4>
                            <p className="text-sm text-amber-700 leading-relaxed">
                                Changes to 'Admin' permissions will trigger a mandatory system-wide re-authentication for all active sessions.
                                Ensure all scheduled maintenance tasks are paused before proceeding.
                            </p>
                        </div>
                    </div>

                    {/* Right: Audit Log (1 col) */}
                    <div className="lg:col-span-1 h-full">
                        <AuditLogPanel logs={auditLogs} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SharedResponsibilities;
