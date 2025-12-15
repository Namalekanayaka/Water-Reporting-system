import React from 'react';
import Sidebar from '../components/common/Sidebar';

const MainLayout = ({ children }) => {
    return (
        <div className="flex min-h-screen bg-[#F5F3EF]">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 ml-64">
                <main className="min-h-screen">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
