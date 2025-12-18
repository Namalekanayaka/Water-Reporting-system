import React from 'react';

const AreaHealth = () => {
    return (
        <div className="w-full bg-[#fbfbfd] min-h-screen p-6 md:p-12">
            <div className="max-w-[1240px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="mb-16">
                    <span className="text-water-600 font-bold uppercase tracking-widest text-[13px] mb-3 block">Wellness Intelligence</span>
                    <h1 className="text-[40px] md:text-[56px] font-black tracking-tight text-gray-900 leading-none">
                        Area Insights.
                    </h1>
                </div>

                <div className="bg-white rounded-[40px] p-20 text-center shadow-apple border border-gray-50/50">
                    <div className="text-6xl mb-8">🌊</div>
                    <h3 className="text-[28px] font-black text-gray-900 mb-4">Under Development.</h3>
                    <p className="text-[17px] text-gray-400 font-medium max-w-sm mx-auto leading-relaxed">
                        We're currently building advanced tracking for your local water health score. Check back soon.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AreaHealth;
