import React from 'react';

const StatBox = ({ label, value, trend, isPositive }) => (
    <div className="bg-md-surface p-5 rounded-[24px] border border-md-outline/10 flex flex-col items-center text-center hover:shadow-sm transition-shadow">
        <p className="text-xs font-bold text-md-on-surface-variant uppercase tracking-widest mb-1">{label}</p>
        <p className="text-3xl font-black text-md-on-surface mb-2">{value}</p>
        {trend && (
            <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${isPositive ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                }`}>
                {trend}
            </span>
        )}
    </div>
);

const TeamStats = ({ teams = [] }) => {
    const total = teams.length;
    const active = teams.filter(t => t.status === 'busy').length;

    // Calculate Average Efficiency
    const avgEfficiency = total > 0
        ? Math.round(teams.reduce((acc, t) => acc + (t.efficiency || 100), 0) / total)
        : 100;

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
            <StatBox label="Total Teams" value={total} />
            <StatBox label="Active Now" value={active} trend={active > 0 ? "Deployed" : "Standby"} isPositive={active > 0} />
            <StatBox label="Avg Response" value="14m" trend="-2m" isPositive={true} />
            <StatBox label="Efficiency" value={`${avgEfficiency}%`} trend="Optimal" isPositive={avgEfficiency > 90} />
        </div>
    );
};

export default TeamStats;
