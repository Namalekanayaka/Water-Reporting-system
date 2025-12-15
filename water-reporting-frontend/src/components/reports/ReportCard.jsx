import React from 'react';
import SeverityBadge from './SeverityBadge';

const ReportCard = ({ report }) => {
    const statusConfig = {
        pending: {
            bg: 'bg-yellow-50',
            text: 'text-yellow-700',
            border: 'border-yellow-200',
            icon: '⏳'
        },
        'in-progress': {
            bg: 'bg-blue-50',
            text: 'text-blue-700',
            border: 'border-blue-200',
            icon: '🔄'
        },
        resolved: {
            bg: 'bg-emerald-50',
            text: 'text-emerald-700',
            border: 'border-emerald-200',
            icon: '✅'
        },
        closed: {
            bg: 'bg-gray-50',
            text: 'text-gray-600',
            border: 'border-gray-200',
            icon: '🔒'
        },
    };

    const config = statusConfig[report.status];

    return (
        <div className="
      bg-white
      border border-gray-200
      rounded-xl p-4
      shadow-sm hover:shadow-md
      transition-all duration-300
      hover:-translate-y-0.5
    ">
            <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-1">
                        {report.type}
                    </h3>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                        <span>📍</span>
                        {report.location}
                    </p>
                </div>
                <SeverityBadge severity={report.severity} />
            </div>

            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {report.description}
            </p>

            <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400 flex items-center gap-1">
                    <span>🕐</span>
                    {report.time}
                </span>
                <span className={`
          ${config.bg} ${config.text}
          border ${config.border}
          px-3 py-1 rounded-full
          text-xs font-medium
          flex items-center gap-1
        `}>
                    <span>{config.icon}</span>
                    {report.status.replace('-', ' ').toUpperCase()}
                </span>
            </div>
        </div>
    );
};

export default ReportCard;
