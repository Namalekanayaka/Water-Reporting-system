import React from 'react';

const StatCard = ({ title, value, icon, color = 'green', subtitle, trend }) => {
    const colorStyles = {
        green: {
            bg: 'bg-emerald-600',
            light: 'bg-emerald-50',
            text: 'text-emerald-600',
            border: 'border-emerald-200'
        },
        blue: {
            bg: 'bg-blue-600',
            light: 'bg-blue-50',
            text: 'text-blue-600',
            border: 'border-blue-200'
        },
        orange: {
            bg: 'bg-orange-500',
            light: 'bg-orange-50',
            text: 'text-orange-600',
            border: 'border-orange-200'
        },
        purple: {
            bg: 'bg-purple-600',
            light: 'bg-purple-50',
            text: 'text-purple-600',
            border: 'border-purple-200'
        },
    };

    const style = colorStyles[color];

    return (
        <div className={`
      bg-white
      border ${style.border}
      rounded-2xl p-6
      shadow-sm hover:shadow-md
      transition-all duration-300
      hover:-translate-y-1
    `}>
            <div className="flex items-start justify-between mb-4">
                <div className={`${style.light} p-3 rounded-xl`}>
                    <span className="text-2xl">{icon}</span>
                </div>
                {trend && (
                    <span className={`text-sm font-semibold ${trend > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                        {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
                    </span>
                )}
            </div>

            <div>
                <p className="text-sm text-gray-500 mb-1">
                    {title}
                </p>
                <p className={`text-3xl font-bold ${style.text} mb-1`}>
                    {value.toLocaleString()}
                </p>
                {subtitle && (
                    <p className="text-xs text-gray-400">
                        {subtitle}
                    </p>
                )}
            </div>
        </div>
    );
};

export default StatCard;
