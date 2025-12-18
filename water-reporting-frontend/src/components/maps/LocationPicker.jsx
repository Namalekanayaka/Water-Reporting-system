import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

function LocationMarker({ position, setPosition }) {
    useMapEvents({ click(e) { setPosition(e.latlng); } });
    return position === null ? null : <Marker position={position} />;
}

const LocationPicker = ({ onLocationSelect, initialLocation = null, className = '' }) => {
    const defaultCenter = { lat: 6.9271, lng: 79.8612 };
    const [position, setPosition] = useState(initialLocation ? { lat: initialLocation.lat, lng: initialLocation.lng } : null);
    const [address, setAddress] = useState(initialLocation?.address || '');
    const [mapCenter, setMapCenter] = useState(initialLocation ? { lat: initialLocation.lat, lng: initialLocation.lng } : defaultCenter);
    const [isLoadingGPS, setIsLoadingGPS] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (position && onLocationSelect) {
            onLocationSelect({ lat: position.lat, lng: position.lng, address: address });
        }
    }, [position, address]);

    const handleGetCurrentLocation = () => {
        setIsLoadingGPS(true);
        setError('');
        if (!navigator.geolocation) {
            setError('Browser not supported');
            setIsLoadingGPS(false);
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (geoPosition) => {
                const { latitude, longitude } = geoPosition.coords;
                const newPos = { lat: latitude, lng: longitude };
                setPosition(newPos);
                setMapCenter(newPos);
                setAddress(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
                setIsLoadingGPS(false);
            },
            () => { setError('GPS retrieval failed.'); setIsLoadingGPS(false); },
            { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
        );
    };

    return (
        <div className={`space-y-6 ${className}`}>
            <div className="space-y-3">
                <label className="text-[13px] font-bold text-gray-400 uppercase tracking-widest ml-1">Precise Address</label>
                <div className="flex gap-3">
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Click map or enter address..."
                        className="flex-1 px-6 py-4 bg-gray-50 border border-transparent focus:border-gray-200 rounded-2xl font-medium outline-none transition-all placeholder:text-gray-300"
                    />
                    <button
                        type="button"
                        onClick={handleGetCurrentLocation}
                        disabled={isLoadingGPS}
                        className="px-6 py-4 bg-gray-900 !text-white rounded-2xl font-black text-[14px] hover:bg-black transition-all shadow-lg active:scale-95 flex items-center gap-2"
                    >
                        {isLoadingGPS ? '...' : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        )}
                        <span className="hidden sm:inline">GPS</span>
                    </button>
                </div>
                {error && <p className="text-[12px] font-bold text-red-500 ml-1 mt-1">{error}</p>}
            </div>

            <div className="rounded-[32px] overflow-hidden border border-gray-100 shadow-apple grayscale hover:grayscale-0 transition-all duration-700">
                <MapContainer
                    center={[mapCenter.lat, mapCenter.lng]}
                    zoom={13}
                    style={{ height: '350px', width: '100%' }}
                    className="z-0"
                >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <LocationMarker position={position} setPosition={setPosition} />
                </MapContainer>
            </div>
        </div>
    );
};

export default LocationPicker;
