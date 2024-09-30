import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { getDistance } from 'geolib';

// Example hospital data
const hospitals = [
  { id: 1, name: 'Hospital A', lat: -1.28333, lon: 36.81667 }, // Example Coordinates
  { id: 2, name: 'Hospital B', lat: -1.29207, lon: 36.82194 },
  { id: 3, name: 'Hospital C', lat: -1.30000, lon: 36.85000 },
];

// Custom red icon for hospitals
const redIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-icon-2x-red.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Component to zoom the map to a new location
const MapZoom = ({ position }) => {
  const map = useMap();
  map.setView(position, 15); // Zoom level 15 for better detail
  return null;
};

function Home() {
  const [searchLocation, setSearchLocation] = useState('');
  const [distance, setDistance] = useState(null);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [currentPosition, setCurrentPosition] = useState([-1.2921, 36.8219]); // Default location (Nairobi)

  // Function to handle searching
  const handleSearch = async () => {
    if (!searchLocation) return;

    try {
      // Fetch geolocation data from OpenStreetMap Nominatim API
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${searchLocation}`
      );
      const data = await response.json();
      
      if (data.length > 0) {
        const userLocation = {
          lat: parseFloat(data[0].lat),
          lon: parseFloat(data[0].lon),
        };

        // Calculate nearest hospital
        const nearestHospital = hospitals.reduce((prev, current) => {
          const prevDistance = getDistance(userLocation, { lat: prev.lat, lon: prev.lon });
          const currentDistance = getDistance(userLocation, { lat: current.lat, lon: current.lon });
          return prevDistance < currentDistance ? prev : current;
        });

        setSelectedHospital(nearestHospital);
        setDistance(getDistance(userLocation, { lat: nearestHospital.lat, lon: nearestHospital.lon }) / 1000); // Convert to KM
        setCurrentPosition([userLocation.lat, userLocation.lon]); // Update the map to the searched location
      } else {
        alert('Location not found. Please try a different search.');
      }
    } catch (error) {
      console.error('Error fetching location:', error);
      alert('Failed to fetch location. Please try again.');
    }
  };

  // Handle "Enter" key press to search
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
      <h2>Find Nearest Hospitals</h2>
      <MapContainer center={currentPosition} zoom={13} style={{ height: '500px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {hospitals.map((hospital) => (
          <Marker key={hospital.id} position={[hospital.lat, hospital.lon]} icon={redIcon}>
            <Popup>{hospital.name}</Popup>
          </Marker>
        ))}
        {/* Zoom the map to the current searched position */}
        <MapZoom position={currentPosition} />
      </MapContainer>
      
      <input
        type="text"
        placeholder="Search for a location..."
        value={searchLocation}
        onChange={(e) => setSearchLocation(e.target.value)}
        onKeyPress={handleKeyPress} // Add the keypress listener for "Enter" key
        style={{ marginTop: '10px', padding: '10px', width: '100%' }}
      />
      <button onClick={handleSearch} style={{ marginTop: '10px', padding: '10px' }}>
        Search
      </button>

      {selectedHospital && (
        <div style={{ marginTop: '20px' }}>
          <p>Nearest Hospital: {selectedHospital.name}</p>
          <p>Distance: {distance} km</p>
        </div>
      )}
    </div>
  );
}

export default Home;
