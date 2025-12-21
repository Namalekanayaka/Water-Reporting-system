import React from 'react';

const StatCard = ({ title, value, trend, isPositive, icon }) => {
    return (
        <div className="bg-md-surface-variant/20 backdrop-blur-sm p-6 rounded-[24px] border border-md-outline/10 hover:shadow-md-2 transition-all duration-300 group">
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-md-surface rounded-2xl text-md-primary group-hover:bg-md-primary group-hover:text-md-on-primary transition-colors duration-300 shadow-sm">
                    {icon}
                </div>
                {trend && (
                    <div className={`flex items-center text-xs font-bold px-3 py-1.5 rounded-full border ${isPositive
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                        : 'bg-md-error/10 text-md-error border-md-error/20'
                        }`}>
                        {isPositive ? '↑' : '↓'} {trend}
                    </div>
                )}
            </div>
            <div>
                <p className="text-md-on-surface-variant text-sm font-bold uppercase tracking-widest mb-1">{title}</p>
                <h3 className="text-md-on-surface text-3xl font-black tracking-tight">{value}</h3>
            </div>
        </div>
    );
};

export default StatCard;
