import React from 'react';

const SeverityBadge = ({ severity }) => {
    const badges = {
        low: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        medium: 'bg-yellow-50 text-yellow-700 border-yellow-200',
        high: 'bg-orange-50 text-orange-700 border-orange-200',
        critical: 'bg-red-50 text-red-700 border-red-200',
    };

    const icons = {
        low: '🟢',
        medium: '🟡',
        high: '🟠',
        critical: '🔴',
    };

    return (
        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${badges[severity]}`}>
            <span>{icons[severity]}</span>
            {severity.charAt(0).toUpperCase() + severity.slice(1)}
        </span>
    );
};

export default SeverityBadge;
