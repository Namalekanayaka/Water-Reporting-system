import React from 'react';

const TeamManagement = () => {
    return (
        <div className="w-full bg-md-surface min-h-screen">
            <div className="max-w-[1240px] mx-auto py-12 md:py-20 px-6">
                <div className="mb-12">
                    <span className="text-md-primary font-black uppercase tracking-[0.2em] text-[11px] mb-3 block">Personnel Matrix</span>
                    <h1 className="text-[32px] md:text-[48px] font-black tracking-tight text-md-on-surface">
                        Team Management.
                    </h1>
                </div>
                <div className="bg-white p-12 rounded-[32px] shadow-md-1 border border-md-outline/10">
                    <p className="text-md-on-surface-variant font-medium text-[17px]">
                        The dynamic personnel matrix and technician assignment engine are currently being initialized.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TeamManagement;
