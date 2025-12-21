import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const TimeSeriesChart = ({ data }) => {
    return (
        <div className="bg-md-surface p-6 rounded-[32px] border border-md-outline/10 shadow-sm">
            <h3 className="text-xl font-black text-md-on-surface mb-6">Report Trends</h3>
            <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorReports" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#0061A4" stopOpacity={0.2} />
                                <stop offset="95%" stopColor="#0061A4" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#535F70', fontSize: 12, fontWeight: 500 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#535F70', fontSize: 12 }}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                borderRadius: '12px',
                                border: '1px solid rgba(0,0,0,0.05)',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                            }}
                            itemStyle={{ color: '#001D36', fontWeight: 'bold' }}
                            labelStyle={{ color: '#535F70', marginBottom: '4px' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="reports"
                            stroke="#0061A4"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorReports)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default TimeSeriesChart;
