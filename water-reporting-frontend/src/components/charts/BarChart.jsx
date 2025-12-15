import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const IssueTypeChart = ({ data }) => {
    const colors = ['#059669', '#0891B2', '#F59E0B', '#8B5CF6'];

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-lg">
                    <p className="font-semibold text-gray-800 text-sm">{payload[0].payload.type}</p>
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
                    Issue Types Distribution
                </h2>
                <div className="bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
                    <span className="text-xs font-semibold text-emerald-700">
                        📊 Analytics
                    </span>
                </div>
            </div>

            <ResponsiveContainer width="100%" height={280}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis
                        dataKey="type"
                        stroke="#9CA3AF"
                        tick={{ fill: '#6B7280', fontSize: 11 }}
                        tickLine={false}
                    />
                    <YAxis
                        stroke="#9CA3AF"
                        tick={{ fill: '#6B7280', fontSize: 11 }}
                        tickLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(5, 150, 105, 0.05)' }} />
                    <Bar
                        dataKey="count"
                        radius={[8, 8, 0, 0]}
                        name="Number of Reports"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default IssueTypeChart;
