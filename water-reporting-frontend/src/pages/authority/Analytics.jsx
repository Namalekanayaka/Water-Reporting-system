import React from 'react';
import TimeSeriesChart from '../../components/charts/TimeSeriesChart';
import BarChart from '../../components/charts/BarChart';
import PieChart from '../../components/charts/PieChart';
import ForecastPanel from '../../components/ai/ForecastPanel';

const Analytics = () => {
    // Mock Data
    const trendData = [
        { name: 'Mon', reports: 12 },
        { name: 'Tue', reports: 19 },
        { name: 'Wed', reports: 15 },
        { name: 'Thu', reports: 25 },
        { name: 'Fri', reports: 32 },
        { name: 'Sat', reports: 20 },
        { name: 'Sun', reports: 18 },
    ];

    const severityData = [
        { name: 'Low', value: 45, color: '#10b981' },
        { name: 'Medium', value: 32, color: '#f59e0b' },
        { name: 'High', value: 18, color: '#f97316' },
        { name: 'Critical', value: 5, color: '#ef4444' },
    ];

    const typeData = [
        { name: 'Leakage', value: 40, color: '#0ea5e9' },
        { name: 'Contamination', value: 15, color: '#8b5cf6' },
        { name: 'No Supply', value: 25, color: '#f43f5e' },
        { name: 'Low Pressure', value: 20, color: '#10b981' },
    ];

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
