import React from 'react';

const IssueManagement = () => {
    return (
        <div className="w-full bg-md-surface min-h-screen">
            <div className="max-w-[1240px] mx-auto py-12 md:py-20 px-6">
                <div className="mb-12">
                    <span className="text-md-primary font-black uppercase tracking-[0.2em] text-[11px] mb-3 block">Infrastructure Oversight</span>
                    <h1 className="text-[32px] md:text-[48px] font-black tracking-tight text-md-on-surface">
                        Issue Management.
                    </h1>
                </div>
                <div className="bg-white p-12 rounded-[32px] shadow-md-1 border border-md-outline/10">
                    <p className="text-md-on-surface-variant font-medium text-[17px]">
                        The high-precision issue tracking interface and resolution workflow are currently being architected.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default IssueManagement;
