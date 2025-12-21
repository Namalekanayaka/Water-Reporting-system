import React from 'react';

const AlertPanel = ({ alerts = [] }) => {
    return (
        <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-3xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <h3 className="text-red-900 dark:text-red-200 font-bold">Critical Alerts</h3>
            </div>

            <div className="space-y-3">
                {alerts.map((alert) => (
                    <div key={alert.id} className="flex gap-3 items-start bg-white/60 dark:bg-black/20 p-3 rounded-xl border border-red-100/50 dark:border-red-900/20">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0 animate-pulse"></div>
                        <div className="flex-1">
                            <p className="text-sm font-bold text-red-800 dark:text-red-300 leading-tight">{alert.message}</p>
                            <p className="text-xs text-red-600/70 dark:text-red-400/60 mt-1">{alert.time}</p>
                        </div>
                        <button className="text-red-400 hover:text-red-600 dark:text-red-500 dark:hover:text-red-300">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                ))}
                {alerts.length === 0 && (
                    <p className="text-sm text-red-800/60 text-center py-2">No active alerts.</p>
                )}
            </div>
        </div>
    );
};

export default AlertPanel;
