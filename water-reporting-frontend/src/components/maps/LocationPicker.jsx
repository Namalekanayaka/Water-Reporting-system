import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Component to handle map clicks
function LocationMarker({ position, setPosition }) {
    useMapEvents({
        click(e) {
            setPosition(e.latlng);
        },
    });

    return position === null ? null : <Marker position={position} />;
}

const LocationPicker = ({
    onLocationSelect,
    initialLocation = null,
    className = ''
}) => {
    // Default to Colombo, Sri Lanka
    const defaultCenter = { lat: 6.9271, lng: 79.8612 };

    const [position, setPosition] = useState(
        initialLocation ? { lat: initialLocation.lat, lng: initialLocation.lng } : null
    );
    const [address, setAddress] = useState(initialLocation?.address || '');
    const [mapCenter, setMapCenter] = useState(
        initialLocation ? { lat: initialLocation.lat, lng: initialLocation.lng } : defaultCenter
    );
    const [isLoadingGPS, setIsLoadingGPS] = useState(false);
    const [error, setError] = useState('');

    // Update parent component when position changes
    useEffect(() => {
        if (position && onLocationSelect) {
            onLocationSelect({
                lat: position.lat,
                lng: position.lng,
                address: address
            });
        }
    }, [position, address, onLocationSelect]);

    // Get user's current location using GPS
    const handleGetCurrentLocation = () => {
        setIsLoadingGPS(true);
        setError('');

        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser');
            setIsLoadingGPS(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (geoPosition) => {
                const { latitude, longitude } = geoPosition.coords;
                const newPosition = { lat: latitude, lng: longitude };
                setPosition(newPosition);
                setMapCenter(newPosition);
                setAddress(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
                setIsLoadingGPS(false);
            },
            (error) => {
                setError('Unable to retrieve your location. Please select on the map.');
                setIsLoadingGPS(false);
                console.error('Geolocation error:', error);
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            }
        );
    };

    return (
        <div className={`space-y-4 ${className}`}>
            {/* Address Input */}
            <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                    Location Address
                </label>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter address or click on map"
                        className="flex-1 px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-water-500/20 focus:border-water-500 outline-none transition-all"
                    />
                    <button
                        type="button"
                        onClick={handleGetCurrentLocation}
                        disabled={isLoadingGPS}
                        className="px-4 py-3 bg-water-600 hover:bg-water-700 disabled:bg-gray-400 !text-white rounded-xl font-semibold transition-colors flex items-center gap-2 whitespace-nowrap shadow-sm"
                    >
                        {isLoadingGPS ? (
                            <>
                                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span className="hidden sm:inline">Getting...</span>
                            </>
                        ) : (
                            <>
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span className="hidden sm:inline">Use GPS</span>
                            </>
                        )}
                    </button>
                </div>
                {error && (
                    <p className="text-sm text-red-600">{error}</p>
                )}
            </div>

            {/* Map */}
            <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                    Select Location on Map
                    {position && (
                        <span className="ml-2 text-xs font-normal text-gray-500">
                            ({position.lat.toFixed(6)}, {position.lng.toFixed(6)})
                        </span>
                    )}
                </label>
                <div className="rounded-xl overflow-hidden border-2 border-gray-200 shadow-sm">
                    <MapContainer
                        center={[mapCenter.lat, mapCenter.lng]}
                        zoom={13}
                        style={{ height: '400px', width: '100%' }}
                        className="z-0"
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <LocationMarker position={position} setPosition={setPosition} />
                    </MapContainer>
                </div>
                <p className="text-xs text-gray-500">
                    💡 Click anywhere on the map to select a location, or use the GPS button to get your current location
                </p>
            </div>
        </div>
    );
};

export default LocationPicker;
