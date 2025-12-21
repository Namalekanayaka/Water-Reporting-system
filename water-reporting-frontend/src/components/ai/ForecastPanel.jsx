import React from 'react';

const ForecastPanel = () => {
    return (
        <div className="bg-gradient-to-br from-md-primary/5 to-md-surface p-8 rounded-[32px] border border-md-primary/10 relative overflow-hidden group hover:border-md-primary/20 transition-all duration-500">
            <div className="absolute top-0 right-0 w-64 h-64 bg-md-primary/5 rounded-full blur-3xl -mr-32 -mt-32"></div>

            <div className="flex justify-between items-start mb-8 relative z-10">
                <div>
                    <h3 className="text-2xl font-black text-md-on-surface tracking-tight mb-1">AI Predictive Intelligence</h3>
                    <p className="text-md-on-surface-variant font-medium">7-Day Water Stress Forecast</p>
                </div>
                <div className="px-4 py-2 bg-md-primary/10 rounded-full text-md-primary text-xs font-black uppercase tracking-widest border border-md-primary/10 animate-pulse">
                    Live Analysis
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 relative z-10">
                <div className="bg-white/60 p-6 rounded-2xl border border-md-outline/10 text-center hover:scale-105 transition-transform duration-300">
                    <p className="text-xs font-bold text-md-on-surface-variant uppercase tracking-wider mb-2">Predicted Stress</p>
                    <p className="text-4xl font-black text-orange-600 mb-1">High</p>
                    <p className="text-xs text-orange-600/80 font-bold">+12% vs avg</p>
                </div>
                <div className="bg-white/60 p-6 rounded-2xl border border-md-outline/10 text-center hover:scale-105 transition-transform duration-300">
                    <p className="text-xs font-bold text-md-on-surface-variant uppercase tracking-wider mb-2">Demand Peak</p>
                    <p className="text-4xl font-black text-md-primary mb-1">09:00</p>
                    <p className="text-xs text-md-primary/80 font-bold">Tommorow AM</p>
                </div>
                <div className="bg-white/60 p-6 rounded-2xl border border-md-outline/10 text-center hover:scale-105 transition-transform duration-300">
                    <p className="text-xs font-bold text-md-on-surface-variant uppercase tracking-wider mb-2">Leak Risk</p>
                    <p className="text-4xl font-black text-md-error mb-1">Critical</p>
                    <p className="text-xs text-md-error/80 font-bold">Zone 4B</p>
                </div>
            </div>

            <div className="bg-md-on-surface p-6 rounded-2xl text-md-surface relative z-10 group-hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                    <span className="text-2xl">🤖</span>
                    <div>
                        <p className="font-bold text-lg mb-1">AI Recommendation</p>
                        <p className="text-md-surface-variant/80 text-sm leading-relaxed">
                            "Based on historical consumption patterns and predicted heatwave, consider rerouting auxiliary supply to Zone 4B between 08:00 and 10:00 AM to prevent pressure drops."
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForecastPanel;
