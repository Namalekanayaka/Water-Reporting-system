import React from 'react';

const Statistics = () => {
    return (
        <div className="w-full bg-md-surface min-h-screen">
            <div className="max-w-[1240px] mx-auto py-12 md:py-24 px-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="mb-16">
                    <span className="text-md-primary font-black uppercase tracking-[0.2em] text-[11px] mb-3 block">Global Metrics</span>
                    <h1 className="text-[40px] md:text-[64px] font-black tracking-tight text-md-on-surface leading-none">
                        WRS Statistics.
                    </h1>
                </div>

                <div className="bg-white rounded-[40px] p-24 text-center shadow-md-1 border border-md-outline/10">
                    <div className="text-7xl mb-10 opacity-60">📊</div>
                    <h3 className="text-[32px] font-black text-md-on-surface mb-6">Deep Analytics.</h3>
                    <p className="text-[19px] text-md-on-surface-variant font-medium max-w-sm mx-auto leading-relaxed">
                        We are currently aggregating high-density infrastructure data to provide the most accurate community water forensics.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Statistics;
