import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/TripHistory.css';

interface Trip {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  location: string;
  places: { name: string; lat: number; lng: number }[];
  cost: number;
}

const TripHistory: React.FC = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);

  useEffect(() => {
    const mockTrips: Trip[] = [
      {
        id: 1,
        name: "Chuyến đi Đà Lạt",
        startDate: "01/05/2025",
        endDate: "05/05/2025",
        location: "Đà Lạt, Lâm Đồng",
        places: [
          { name: "Thung Lũng Tình Yêu", lat: 11.9411, lng: 108.4358 },
          { name: "Hồ Xuân Hương", lat: 11.9407, lng: 108.4419 },
          { name: "Chợ Đà Lạt", lat: 11.9430, lng: 108.4406 }
        ],
        cost: 5000000
      }
    ];
    setTrips(mockTrips);
  }, []);

  return (
    <div className="trip-history-container">
      {/* Danh sách chuyến đi (Bên trái) */}
      <div className="trip-list">
        <h2>Danh Sách Chuyến Đi</h2>
        {trips.map((trip) => (
          <div key={trip.id} className="trip-item" onClick={() => setSelectedTrip(trip)}>
            <h3>{trip.name}</h3>
            <p>{trip.startDate} - {trip.endDate}</p>
            <p>{trip.location}</p>
          </div>
        ))}
      </div>

      {/* Chi tiết chuyến đi (Bên phải) */}
      {selectedTrip && (
      <div className="trip-details">
        <h2>Chi tiết chuyến đi: {selectedTrip.name}</h2>
        <p>Số tiền đã chi: {selectedTrip.cost.toLocaleString()} VND</p>

        {/* Danh sách địa điểm đã đi */}
        <h3>Địa điểm đã đi:</h3>
        <ul>
          {selectedTrip.places.map((place, index) => (
            <li key={index}>{place.name}</li>
          ))}
        </ul>

        {/* Bản đồ OpenStreetMap với Leaflet */}
        <MapContainer center={[selectedTrip.places[0].lat, selectedTrip.places[0].lng]} zoom={13} style={{ height: "400px", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {selectedTrip.places.map((place, index) => (
            <Marker key={index} position={[place.lat, place.lng]}>
              <Popup>{place.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    )}
    </div>
  );
};

export default TripHistory;
