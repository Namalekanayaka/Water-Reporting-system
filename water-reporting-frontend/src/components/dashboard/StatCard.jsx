import React from 'react';

const StatCard = ({ title, value, trend, isPositive, icon }) => {
    return (
        <div className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-md p-6 rounded-3xl shadow-sm border border-white/50 dark:border-slate-700/50 hover:shadow-md transition-all duration-300 group">
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-white/60 dark:bg-slate-700/60 rounded-2xl group-hover:bg-md-primary/10 transition-colors">
                    {icon}
                </div>
                {trend && (
                    <div className={`flex items-center text-xs font-bold px-2 py-1 rounded-full ${isPositive ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                        }`}>
                        {isPositive ? '↑' : '↓'} {trend}
                    </div>
                )}
            </div>
            <div>
                <p className="text-md-on-surface-variant/70 text-sm font-semibold uppercase tracking-wider mb-1">{title}</p>
                <h3 className="text-md-on-surface text-3xl font-black tracking-tight">{value}</h3>
            </div>
        </div>
    );
};

export default StatCard;
