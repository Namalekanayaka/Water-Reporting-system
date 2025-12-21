import React from 'react';

const AuditLogPanel = () => {
    const logs = [
        { id: 1, action: 'Role Updated', actor: 'AdminUSER', target: 'Manager Role', time: '10:42 AM', status: 'success' },
        { id: 2, action: 'Login Attempt', actor: 'Unknown IP', target: 'System', time: '10:15 AM', status: 'failure' },
        { id: 3, action: 'Data Export', actor: 'Analyst_01', target: 'Weekly Report', time: '09:30 AM', status: 'success' },
        { id: 4, action: 'Key Generated', actor: 'System', target: 'API Token', time: 'Yesterday', status: 'warning' },
    ];

    const getStatusStyle = (status) => {
        switch (status) {
            case 'success': return 'text-emerald-600 bg-emerald-50 border-emerald-100';
            case 'failure': return 'text-red-600 bg-red-50 border-red-100';
            case 'warning': return 'text-amber-600 bg-amber-50 border-amber-100';
            default: return 'text-gray-600 bg-gray-50 border-gray-100';
        }
    };

    return (
        <div className="bg-md-surface p-6 rounded-[32px] border border-md-outline/10 shadow-sm h-full">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-black text-md-on-surface">Security Audit Log</h3>
                <span className="text-xs font-bold text-md-primary bg-md-primary/10 px-3 py-1 rounded-full animate-pulse">Live Feed</span>
            </div>

            <div className="space-y-4 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-[2px] before:bg-md-outline/10">
                {logs.map((log) => (
                    <div key={log.id} className="relative pl-10 group">
                        <div className={`absolute left-[13px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-white shadow-sm z-10 ${log.status === 'success' ? 'bg-emerald-500' :
                                log.status === 'failure' ? 'bg-red-500' : 'bg-amber-500'
                            }`}></div>

                        <div className="bg-md-surface-variant/10 p-4 rounded-2xl border border-md-outline/5 hover:bg-white hover:shadow-md transition-all duration-300">
                            <div className="flex justify-between items-start mb-1">
                                <span className="text-sm font-bold text-md-on-surface">{log.action}</span>
                                <span className="text-[10px] text-md-on-surface-variant font-mono">{log.time}</span>
                            </div>
                            <p className="text-xs text-md-on-surface-variant mb-2">
                                <span className="font-semibold text-md-primary">{log.actor}</span> acted on {log.target}
                            </p>
                            <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${getStatusStyle(log.status)}`}>
                                {log.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            <button className="w-full mt-6 py-3 text-xs font-bold text-md-on-surface-variant uppercase tracking-widest hover:bg-md-surface-variant/20 rounded-xl transition-colors">
                View All History
            </button>
        </div>
    );
};

export default AuditLogPanel;
