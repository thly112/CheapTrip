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

interface Expense { 
  category: string; 
  amount: number; 
  description: string; 
}

interface WeatherForecast { 
  forecastDate: string; 
  temperature: number; 
  weatherCondition: string; 
}

const TripHistory: React.FC = () => { 
  const [trips, setTrips] = useState<Trip[]>([]); 
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null); 
  const [expenses, setExpenses] = useState<Expense[]>([]); 
  const [weatherForecasts, setWeatherForecasts] = useState<WeatherForecast[]>([]); 
  const [places, setPlaces] = useState<{ name: string; lat: number; lng: number }[]>([]);

  const serverUrl = "http://localhost:5000"; 
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ1c2VyQGV4YW1wbGUuY29tIiwiaWF0IjoxNzQzODcwMTE3LCJleHAiOjE3NDM4NzM3MTd9.pkTnzkSG_B70IN8Du5B-B1u1quVGJ3ii0vX6xjoT6hc"; 

  useEffect(() => {
    const fetchTrips = async () => { 
      try { 
        const response = await fetch(`${serverUrl}/api/trips`, { 
          headers: { 'Authorization': `Bearer ${token}` }, 
        }); 
        const data = await response.json(); 
        setTrips(data); 
      } catch (error) { 
        console.error('Error fetching trips:', error); 
      } 
    };

    fetchTrips(); 
  }, [token]);

  useEffect(() => {
    if (selectedTrip) {
      const fetchDetails = async (tripId: number) => { 
        try { 
          const expenseResponse = await fetch(`${serverUrl}/api/trips/${tripId}/expenses`, { 
            headers: { 'Authorization': `Bearer ${token}` }, 
          });
          const expenseData = await expenseResponse.json();
          setExpenses(expenseData);

          const weatherResponse = await fetch(`${serverUrl}/api/trips/${tripId}/weather`, { 
            headers: { 'Authorization': `Bearer ${token}` }, 
          });
          const weatherData = await weatherResponse.json();
          setWeatherForecasts(weatherData);

          const placesResponse = await fetch(`${serverUrl}/api/trips/${tripId}/places`, { 
            headers: { 'Authorization': `Bearer ${token}` }, 
          });
          const placesData = await placesResponse.json();
          setPlaces(placesData);
        } catch (error) { 
          console.error('Error fetching trip details:', error); 
        } 
      };

      fetchDetails(selectedTrip.id);
    }
  }, [selectedTrip, token]);

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
          <p>Số tiền đã chi: {selectedTrip.cost && selectedTrip.cost > 0 ? selectedTrip.cost.toLocaleString() : "Chưa có chi phí"} VND</p>

          {/* Danh sách chi phí, Địa điểm, và Dự báo thời tiết - Side by side layout */}
          <div className="details-container">
            {/* Danh sách chi phí */}
            <div className="detail-section">
              <h3>Danh sách chi phí:</h3>
              <ul>
                {expenses && expenses.length > 0 ? (
                  expenses.map((expense, index) => (
                    <li key={index}>
                      <strong>{expense.category}</strong>: {expense.amount && expense.amount > 0 ? expense.amount.toLocaleString() : "Chưa có chi phí"} VND
                      {expense.description && <p>{expense.description}</p>}
                    </li>
                  ))
                ) : (
                  <p>Chưa có chi phí cho chuyến đi này.</p>
                )}
              </ul>
            </div>

            {/* Địa điểm đã đi */}
            <div className="detail-section">
              <h3>Địa điểm đã đi:</h3>
              <ul>
                {places && places.length > 0 ? (
                  places.map((place, index) => (
                    <li key={index}>{place.name}</li>
                  ))
                ) : (
                  <p>Không có địa điểm đã đi.</p>
                )}
              </ul>
            </div>

            {/* Dự báo thời tiết */}
            <div className="detail-section">
              <h3>Dự báo thời tiết:</h3>
              <ul>
                {weatherForecasts && weatherForecasts.length > 0 ? (
                  weatherForecasts.map((forecast, index) => (
                    <li key={index}>
                      <strong>{forecast.forecastDate}</strong>: {forecast.temperature}°C, {forecast.weatherCondition}
                    </li>
                  ))
                ) : (
                  <p>Chưa có dự báo thời tiết.</p>
                )}
              </ul>
            </div>
          </div>

          {/* Bản đồ OpenStreetMap với Leaflet */}
          {places && places.length > 0 && (
            <MapContainer center={[places[0].lat, places[0].lng]} zoom={13} style={{ height: "400px", width: "100%" }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {places.map((place, index) => (
                <Marker key={index} position={[place.lat, place.lng]}>
                  <Popup>{place.name}</Popup>
                </Marker>
              ))}
            </MapContainer>
          )}
        </div>
      )}
    </div>
  );
};

export default TripHistory;
