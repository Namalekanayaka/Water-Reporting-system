import React from 'react';

const StatCard = ({ title, value, variant = 'white', subtitle, trend, icon }) => {
    const isDark = variant === 'dark';

    return (
        <div className={`
      relative p-6 rounded-[24px] h-full flex flex-col justify-between transition-all duration-300
      ${isDark
                ? 'bg-[#044A42] text-white shadow-lg shadow-emerald-900/20'
                : 'bg-white text-gray-800 shadow-sm border border-gray-100'
            }
    `}>
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
                <span className={`text-sm font-medium ${isDark ? 'text-emerald-100' : 'text-gray-500'}`}>
                    {title}
                </span>
                <div className={`
          w-8 h-8 rounded-full flex items-center justify-center
          ${isDark ? 'bg-white/10 text-white' : 'bg-gray-50 text-gray-400'}
        `}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                </div>
            </div>

            {/* Value */}
            <div className="mb-4">
                <span className="text-4xl font-bold tracking-tight">
                    {value.toLocaleString()}
                </span>
            </div>

            {/* Footer */}
            <div className="flex items-center gap-2">
                {trend && (
                    <div className={`
            px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1
            ${isDark
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : 'bg-emerald-50 text-emerald-700'
                        }
          `}>
                        <span>{trend > 0 ? '↑' : '↓'}</span>
                        <span>{Math.abs(trend)}%</span>
                    </div>
                )}
                <span className={`text-xs ${isDark ? 'text-emerald-200' : 'text-gray-400'}`}>
                    from last month
                </span>
            </div>
        </div>
    );
};

export default StatCard;
