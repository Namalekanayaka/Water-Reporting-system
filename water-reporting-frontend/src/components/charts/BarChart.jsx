import React from 'react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const BarChart = ({ data }) => {
    return (
        <div className="bg-md-surface p-6 rounded-[32px] border border-md-outline/10 shadow-sm">
            <h3 className="text-xl font-black text-md-on-surface mb-6">Issues by Severity</h3>
            <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart data={data}>
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#535F70', fontSize: 12, fontWeight: 600 }}
                            dy={10}
                        />
                        <Tooltip
                            cursor={{ fill: 'transparent' }}
                            contentStyle={{
                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                borderRadius: '12px',
                                border: 'none',
                                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
                            }}
                        />
                        <Bar dataKey="value" radius={[8, 8, 8, 8]} barSize={40}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Bar>
                    </RechartsBarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default BarChart;
