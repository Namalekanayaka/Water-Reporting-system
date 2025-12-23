import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, LayersControl, LayerGroup } from 'react-leaflet';
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

// Custom Icons (using DivIcon for better styling)
const createCustomIcon = (color, emoji) => new L.DivIcon({
    className: 'custom-map-icon',
    html: `<div style="background-color: ${color}; width: 32px; height: 32px; border-radius: 50%; border: 3px solid white; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); font-size: 16px;">${emoji}</div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

const teamIcon = createCustomIcon('#0061A4', '🚚');
const sensorIcon = createCustomIcon('#10b981', '📡');

const AuthorityMap = ({ reports = [], teams = [], sensors = [] }) => {
    const center = [6.9271, 79.8612]; // Colombo, Sri Lanka center
    const zoom = 12;

    const getSeverityColor = (severity) => {
        switch (severity) {
            case 'critical': return '#ef4444';
            case 'high': return '#f97316';
            case 'medium': return '#f59e0b';
            case 'low': return '#10b981';
            default: return '#6b7280';
        }
    };

    return (
        <div className="rounded-[32px] overflow-hidden border border-md-outline/10 shadow-md-2 h-[calc(100vh-250px)] min-h-[500px] relative z-0">
            <MapContainer
                center={center}
                zoom={zoom}
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={true}
            >
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                />

                <LayersControl position="topright">
                    <LayersControl.Overlay checked name="Reported Issues">
                        <LayerGroup>
                            {reports.map((report) => (
                                <Marker
                                    key={report.id}
                                    position={[report.location.lat, report.location.lng]}
                                    icon={createCustomIcon(getSeverityColor(report.priority), '⚠️')}
                                >
                                    <Popup className="glass-popup">
                                        <div className="p-1">
                                            <span className="text-[10px] font-black uppercase tracking-wider text-md-on-surface-variant/70 block mb-1">Issue #{report.id}</span>
                                            <h3 className="font-bold text-md-on-surface text-sm">{report.title}</h3>
                                            <p className="text-xs text-md-on-surface-variant mb-2">{report.type}</p>
                                            <div className="flex gap-2">
                                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold text-white capitalize bg-${report.priority === 'critical' ? 'red-500' : 'amber-500'}`}>
                                                    {report.priority}
                                                </span>
                                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-bold capitalize">
                                                    {report.status.replace('_', ' ')}
                                                </span>
                                            </div>
                                        </div>
                                    </Popup>
                                </Marker>
                            ))}
                        </LayerGroup>
                    </LayersControl.Overlay>

                    <LayersControl.Overlay checked name="Field Units">
                        <LayerGroup>
                            {teams.map((team) => (
                                <Marker
                                    key={team.id}
                                    position={[team.location.lat, team.location.lng]}
                                    icon={teamIcon}
                                >
                                    <Popup>
                                        <div className="p-1">
                                            <h3 className="font-bold text-md-primary mb-1">{team.name}</h3>
                                            <p className="text-xs text-gray-600 font-medium mb-1">Status: {team.status}</p>
                                            <p className="text-[10px] text-gray-400">Battery: {team.battery}%</p>
                                        </div>
                                    </Popup>
                                </Marker>
                            ))}
                        </LayerGroup>
                    </LayersControl.Overlay>

                    <LayersControl.Overlay checked name="IoT Sensors">
                        <LayerGroup>
                            {sensors.map((sensor) => (
                                <CircleMarker
                                    key={sensor.id}
                                    center={[sensor.location.lat, sensor.location.lng]}
                                    radius={8}
                                    pathOptions={{
                                        color: '#10b981',
                                        fillColor: '#10b981',
                                        fillOpacity: 0.6,
                                        weight: 2
                                    }}
                                >
                                    <Popup>
                                        <div className="p-1">
                                            <h3 className="font-bold text-emerald-700 mb-1">Sensor: {sensor.id}</h3>
                                            <p className="text-xs text-gray-600 font-bold">Flow Rate: {sensor.flowRate} L/min</p>
                                            <p className="text-xs text-gray-600">Pressure: {sensor.pressure} psi</p>
                                        </div>
                                    </Popup>
                                </CircleMarker>
                            ))}
                        </LayerGroup>
                    </LayersControl.Overlay>
                </LayersControl>
            </MapContainer>

            {/* Floating Stats Panel */}
            <div className="absolute top-4 left-4 z-[400] bg-white/90 backdrop-blur-md p-4 rounded-xl border border-md-outline/10 shadow-lg max-w-[200px]">
                <h4 className="text-xs font-black text-md-on-surface-variant uppercase tracking-widest mb-3">Map Layers</h4>
                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-lg shadow-sm">⚠️</div>
                        <div>
                            <p className="text-xs text-md-on-surface font-bold">{reports.length} Critical</p>
                            <p className="text-[10px] text-md-on-surface-variant">Active Issues</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-lg shadow-sm">🚚</div>
                        <div>
                            <p className="text-xs text-md-on-surface font-bold">{teams.length} Active</p>
                            <p className="text-[10px] text-md-on-surface-variant">Field Units</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-lg shadow-sm">📡</div>
                        <div>
                            <p className="text-xs text-md-on-surface font-bold">{sensors.length} Online</p>
                            <p className="text-[10px] text-md-on-surface-variant">IoT Grid</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthorityMap;
