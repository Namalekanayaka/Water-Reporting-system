import React from 'react';

const AlertPanel = ({ alerts = [] }) => {
    return (
        <div className="bg-md-error/5 border border-md-error/10 rounded-[28px] p-6 mb-6">
            <div className="flex items-center gap-4 mb-5">
                <div className="w-10 h-10 rounded-2xl bg-md-error/10 flex items-center justify-center text-md-error shadow-sm">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <div>
                    <h3 className="text-md-on-surface font-black text-lg tracking-tight">Critical Alerts</h3>
                    <p className="text-xs text-md-error font-bold uppercase tracking-widest">Action Required</p>
                </div>
            </div>

            <div className="space-y-3">
                {alerts.map((alert) => (
                    <div key={alert.id} className="flex gap-4 items-start bg-white p-4 rounded-[20px] border border-md-error/10 shadow-sm hover:shadow-md transition-all duration-300 group">
                        <div className="w-2 h-2 rounded-full bg-md-error mt-2 shrink-0 animate-pulse ring-4 ring-md-error/20"></div>
                        <div className="flex-1">
                            <p className="text-sm font-bold text-md-on-surface leading-snug mb-1">{alert.message}</p>
                            <p className="text-xs text-md-on-surface-variant/70 font-medium">{alert.time}</p>
                        </div>
                        <button className="text-md-on-surface-variant/40 hover:text-md-error transition-colors p-1 hover:bg-md-error/5 rounded-lg">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                ))}
                {alerts.length === 0 && (
                    <p className="text-sm text-md-on-surface-variant/60 text-center py-4 font-medium italic">No active alerts. System nominal.</p>
                )}
            </div>
        </div>
    );
};

export default AlertPanel;
