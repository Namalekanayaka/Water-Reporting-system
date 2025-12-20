import React from 'react';

const IssueManagement = () => {
    return (
        <div className="w-full bg-md-surface min-h-screen p-6">
            <div className="max-w-[1240px] mx-auto py-12 md:py-20 px-6">
                <div className="mb-16">
                    <span className="text-md-primary font-black uppercase tracking-[0.2em] text-[11px] mb-3 block">Member B Workspace</span>
                    <h1 className="text-[40px] md:text-[64px] font-black tracking-tight text-md-on-surface leading-none">
                        Issues.
                    </h1>
                </div>

                <div className="bg-white rounded-[40px] p-24 text-center shadow-md-1 border-2 border-dashed border-md-outline/20 flex flex-col items-center justify-center">
                    <div className="text-7xl mb-10">📋</div>
                    <h3 className="text-[32px] font-black text-md-on-surface mb-6">Ready for Development</h3>
                    <p className="text-[19px] text-md-on-surface-variant font-medium max-w-sm mx-auto leading-relaxed">
                        Member B: Start building the Issue Management system here.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default IssueManagement;
