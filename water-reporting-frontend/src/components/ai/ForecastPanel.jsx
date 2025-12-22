import React, { useState, useEffect } from 'react';
import { getAllReports } from '../../services/api/reports';
import { generateSystemForecast } from '../../services/api/predictions';

const ForecastPanel = () => {
    const [forecast, setForecast] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchForecast = async () => {
            try {
                // 1. Get Real Data Stats
                const { success, reports } = await getAllReports();
                if (success) {
                    const stats = {
                        totalReports: reports.length,
                        severityCounts: {
                            low: reports.filter(r => (r.priority || '').toLowerCase().includes('low')).length,
                            medium: reports.filter(r => (r.priority || '').toLowerCase().includes('medium')).length,
                            high: reports.filter(r => (r.priority || '').toLowerCase().includes('high')).length,
                            critical: reports.filter(r => (r.priority || '').toLowerCase().includes('critical')).length
                        }
                    };

                    // 2. Ask AI
                    const prediction = await generateSystemForecast(stats);
                    setForecast(prediction);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchForecast();
    }, []);

    if (loading) return (
        <div className="bg-md-surface p-8 rounded-[32px] border border-md-primary/10 flex items-center justify-center min-h-[300px]">
            <div className="flex flex-col items-center gap-4 animate-pulse">
                <div className="w-16 h-16 rounded-full bg-md-primary/20 flex items-center justify-center text-3xl">🤖</div>
                <p className="font-bold text-md-primary">Analyzing System Data...</p>
            </div>
        </div>
    );

    return (
        <div className="bg-gradient-to-br from-md-primary/5 to-md-surface p-8 rounded-[32px] border border-md-primary/10 relative overflow-hidden group hover:border-md-primary/20 transition-all duration-500 h-full">
            <div className="absolute top-0 right-0 w-64 h-64 bg-md-primary/5 rounded-full blur-3xl -mr-32 -mt-32"></div>

            <div className="flex justify-between items-start mb-8 relative z-10">
                <div>
                    <h3 className="text-2xl font-black text-md-on-surface tracking-tight mb-1">AI Predictive Intelligence</h3>
                    <p className="text-md-on-surface-variant font-medium">24h Water Stress Forecast</p>
                </div>
                <div className="px-4 py-2 bg-md-primary/10 rounded-full text-md-primary text-xs font-black uppercase tracking-widest border border-md-primary/10 animate-pulse">
                    Live Analysis
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 relative z-10">
                <div className="bg-white/60 p-6 rounded-2xl border border-md-outline/10 text-center hover:scale-105 transition-transform duration-300">
                    <p className="text-xs font-bold text-md-on-surface-variant uppercase tracking-wider mb-2">Predicted Stress</p>
                    <p className={`text-4xl font-black mb-1 ${forecast?.stress === 'Critical' ? 'text-red-600' :
                            forecast?.stress === 'High' ? 'text-orange-600' : 'text-emerald-600'
                        }`}>{forecast?.stress || 'Normal'}</p>
                    <p className="text-xs opacity-80 font-bold">System Status</p>
                </div>
                <div className="bg-white/60 p-6 rounded-2xl border border-md-outline/10 text-center hover:scale-105 transition-transform duration-300">
                    <p className="text-xs font-bold text-md-on-surface-variant uppercase tracking-wider mb-2">Demand Peak</p>
                    <p className="text-4xl font-black text-md-primary mb-1">{forecast?.peak || '--:--'}</p>
                    <p className="text-xs text-md-primary/80 font-bold">Estimated Time</p>
                </div>
                <div className="bg-white/60 p-6 rounded-2xl border border-md-outline/10 text-center hover:scale-105 transition-transform duration-300">
                    <p className="text-xs font-bold text-md-on-surface-variant uppercase tracking-wider mb-2">Leak Risk</p>
                    <p className="text-4xl font-black text-md-error mb-1">{forecast?.zone?.split(' ').pop() || 'None'}</p>
                    <p className="text-xs text-md-error/80 font-bold truncate max-w-full px-2">{forecast?.zone || 'All Clear'}</p>
                </div>
            </div>

            <div className="bg-md-on-surface p-6 rounded-2xl text-md-surface relative z-10 group-hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                    <span className="text-2xl">🤖</span>
                    <div>
                        <p className="font-bold text-lg mb-1">AI Recommendation</p>
                        <p className="text-md-surface-variant/80 text-sm leading-relaxed">
                            "{forecast?.recommendation || 'No immediate actions required. System operating within normal parameters.'}"
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForecastPanel;
