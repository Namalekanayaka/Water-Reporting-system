import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Link } from 'react-router-dom';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const ReportsMap = ({ reports = [], height = '500px', center = [6.9271, 79.8612], zoom = 12 }) => {

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-orange-500';
            case 'in_progress': return 'bg-blue-500';
            case 'resolved': return 'bg-emerald-500';
            default: return 'bg-gray-500';
        }
    };

    return (
        <div className="rounded-[32px] overflow-hidden border border-gray-100 shadow-apple transition-all duration-700 hover:shadow-apple-hover">
            <MapContainer
                center={center}
                zoom={zoom}
                style={{ height: height, width: '100%' }}
                className="z-0"
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                {reports.map((report) => (
                    <Marker
                        key={report.id}
                        position={[report.location.lat, report.location.lng]}
                    >
                        <Popup className="apple-popup">
                            <div className="p-2 min-w-[200px]">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className={`w-2 h-2 rounded-full ${getStatusColor(report.status)}`}></div>
                                    <span className="text-[11px] font-black uppercase tracking-wider text-gray-400">
                                        {report.status.replace('_', ' ')}
                                    </span>
                                </div>
                                <h4 className="text-[15px] font-black text-gray-900 mb-1 capitalize">
                                    {report.type.replace('_', ' ')}
                                </h4>
                                <p className="text-[13px] text-gray-500 mb-3 line-clamp-2">
                                    {report.description}
                                </p>
                                <div className="border-t border-gray-50 pt-3 mt-1">
                                    <p className="text-[11px] font-bold text-gray-400 mb-2">
                                        {report.location.address}
                                    </p>
                                    <Link
                                        to={`/dashboard`}
                                        className="text-[12px] font-bold text-water-600 hover:underline"
                                    >
                                        View Details →
                                    </Link>
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default ReportsMap;
