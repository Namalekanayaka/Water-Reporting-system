import React from 'react';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const PieChart = ({ data }) => {
    return (
        <div className="bg-md-surface p-6 rounded-[32px] border border-md-outline/10 shadow-sm flex flex-col items-center">
            <h3 className="text-xl font-black text-md-on-surface mb-2 w-full text-left">Issue Types</h3>
            <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                borderRadius: '8px',
                                border: 'none',
                                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                            }}
                            itemStyle={{ color: '#001D36', fontWeight: 'bold' }}
                        />
                        <Legend
                            verticalAlign="bottom"
                            height={36}
                            iconType="circle"
                            formatter={(value) => <span className="text-xs font-bold text-md-on-surface-variant ml-1">{value}</span>}
                        />
                    </RechartsPieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default PieChart;
