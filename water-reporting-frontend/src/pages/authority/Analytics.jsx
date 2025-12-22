import React, { useEffect, useState } from 'react';
import TimeSeriesChart from '../../components/charts/TimeSeriesChart';
import BarChart from '../../components/charts/BarChart';
import PieChart from '../../components/charts/PieChart';
import ForecastPanel from '../../components/ai/ForecastPanel';
import { getAllReports } from '../../services/api/reports';

const Analytics = () => {
    const [trendData, setTrendData] = useState([
        { name: 'Mon', reports: 12 }, { name: 'Tue', reports: 8 },
        { name: 'Wed', reports: 15 }, { name: 'Thu', reports: 22 },
        { name: 'Fri', reports: 30 }, { name: 'Sat', reports: 25 }, { name: 'Sun', reports: 18 }
    ]);
    const [severityData, setSeverityData] = useState([]);
    const [typeData, setTypeData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const { success, reports } = await getAllReports();
            if (success && reports) {

                // Severity Calculation
                const counts = { low: 0, medium: 0, high: 0, critical: 0 };
                reports.forEach(r => {
                    const p = r.priority ? r.priority.toLowerCase() : 'low';
                    if (counts[p] !== undefined) counts[p]++;
                    else counts.low++; // fallback
                });
                setSeverityData([
                    { name: 'Low', value: counts.low, color: '#10b981' },
                    { name: 'Medium', value: counts.medium, color: '#f59e0b' },
                    { name: 'High', value: counts.high, color: '#f97316' },
                    { name: 'Critical', value: counts.critical, color: '#ef4444' },
                ]);

                // Type Calculation
                const typeCounts = {};
                reports.forEach(r => {
                    const t = r.type || 'Other';
                    typeCounts[t] = (typeCounts[t] || 0) + 1;
                });

                const typeMapping = Object.keys(typeCounts).map((key, index) => ({
                    name: key.replace(/_/g, ' ').toUpperCase(),
                    value: typeCounts[key],
                    color: ['#0ea5e9', '#8b5cf6', '#f43f5e', '#10b981', '#fbbf24'][index % 5]
                }));
                setTypeData(typeMapping);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="w-full bg-md-surface min-h-screen p-4 md:p-6 lg:p-8 animate-in fade-in zoom-in duration-500">
            <div className="max-w-[1600px] mx-auto">
                {/* Header */}
                <div className="mb-8 md:mb-12">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="w-2 h-2 rounded-full bg-md-primary"></span>
                        <span className="text-md-primary font-black uppercase tracking-[0.2em] text-[11px]">Authority Console</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-md-on-surface tracking-tighter">Analytics.</h1>
                </div>

                {/* Dashboard Grid */}
                <div className="space-y-6 md:space-y-8">
                    {/* Top Row: Main Forecast & Time Series */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
                        <div className="xl:col-span-1">
                            <ForecastPanel />
                        </div>
                        <div className="xl:col-span-2">
                            <TimeSeriesChart data={trendData} />
                        </div>
                    </div>

                    {/* Bottom Row: Distribution Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                        <BarChart data={severityData} />
                        <PieChart data={typeData} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
