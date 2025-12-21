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

const TeamStats = () => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
            <StatBox label="Total Teams" value="12" />
            <StatBox label="Active Now" value="8" trend="+2h" isPositive={true} />
            <StatBox label="Avg Response" value="14m" trend="-2m" isPositive={true} />
            <StatBox label="Efficiency" value="94%" trend="+1.2%" isPositive={true} />
        </div>
    );
};

export default TeamStats;
