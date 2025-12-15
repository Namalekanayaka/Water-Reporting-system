import React from 'react';

const PublicDashboard = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
                Public Dashboard
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                    <div className="text-3xl font-bold text-blue-600 mb-2">1,234</div>
                    <div className="text-gray-600 dark:text-gray-400">Total Reports</div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                    <div className="text-3xl font-bold text-green-600 mb-2">892</div>
                    <div className="text-gray-600 dark:text-gray-400">Resolved</div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                    <div className="text-3xl font-bold text-orange-600 mb-2">342</div>
                    <div className="text-gray-600 dark:text-gray-400">Active</div>
                </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
                <p className="text-gray-600 dark:text-gray-400">
                    Charts and visualizations will be displayed here.
                </p>
            </div>
        </div>
    );
};

export default PublicDashboard;
