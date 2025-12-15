import React from 'react';

const MapView = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
                Water Issues Map
            </h1>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg h-[600px] flex items-center justify-center">
                <p className="text-gray-600 dark:text-gray-400">
                    Interactive map with issue markers will be displayed here (Leaflet integration).
                </p>
            </div>
        </div>
    );
};

export default MapView;
