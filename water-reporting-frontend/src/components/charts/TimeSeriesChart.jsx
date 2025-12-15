import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const TrendChart = ({ data }) => {
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-lg">
                    <p className="font-semibold text-gray-800 text-sm">{payload[0].payload.date}</p>
                    <p className="text-xs text-gray-500 mt-1">
                        Reports: <span className="font-bold text-emerald-600">{payload[0].value}</span>
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-800">
                    Reports Trend
                </h2>
                <div className="bg-blue-50 px-3 py-1.5 rounded-full border border-blue-200">
                    <span className="text-xs font-semibold text-blue-700">
                        📈 Last 30 Days
                    </span>
                </div>
            </div>

            <ResponsiveContainer width="100%" height={230}>
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorReports" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#059669" stopOpacity={0.2} />
                            <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis
                        dataKey="date"
                        stroke="#9CA3AF"
                        tick={{ fill: '#6B7280', fontSize: 11 }}
                        tickLine={false}
                    />
                    <YAxis
                        stroke="#9CA3AF"
                        tick={{ fill: '#6B7280', fontSize: 11 }}
                        tickLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#059669', strokeWidth: 2 }} />
                    <Area
                        type="monotone"
                        dataKey="reports"
                        stroke="#059669"
                        strokeWidth={2.5}
                        fill="url(#colorReports)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TrendChart;
