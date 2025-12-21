import React from 'react';

const StatusBadge = ({ status }) => {
    const config = {
        pending: {
            bg: 'bg-amber-50',
            text: 'text-amber-700',
            border: 'border-amber-200',
            icon: '⏳',
            label: 'Pending'
        },
        'in_progress': {
            bg: 'bg-water-50',
            text: 'text-water-600',
            border: 'border-water-200',
            icon: '🔄',
            label: 'In Progress'
        },
        resolved: {
            bg: 'bg-emerald-50',
            text: 'text-emerald-700',
            border: 'border-emerald-200',
            icon: '✅',
            label: 'Resolved'
        },
        closed: {
            bg: 'bg-slate-100',
            text: 'text-slate-600',
            border: 'border-slate-200',
            icon: '🔒',
            label: 'Closed'
        }
    };

    const style = config[status] || config.pending;

    return (
        <span className={`
            inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border
            ${style.bg} ${style.text} ${style.border}
        `}>
            <span>{style.icon}</span>
            {style.label}
        </span>
    );
};

export default StatusBadge;
