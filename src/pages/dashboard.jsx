import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { NavbarComponent, FooterComponent } from "../components/layout";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";
import { useNavigate } from "react-router-dom";

const MainContent = styled.main`
  flex: 1;
  padding: 20px;
`;

const Heading = styled.h1`
  text-align: center;
  font-size: 32px;
  font-weight: 700;
  color: #f2f4f7;
  margin-bottom: 30px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 25px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }
`;

const SensorCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 180px;
  background: ${props => props.background || "rgba(255, 255, 255, 0.05)"};
`;

const Title = styled.h2`
  color: rgba(255, 255, 255, 0.9);
  display: flex;
  justify-content: center;
  font-size: 20px;
  margin-bottom: 15px;
  font-weight: 600;
`;

const SensorValue = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: center;
  margin: 10px 0;
`;

const Value = styled.span`
  font-size: 38px;
  font-weight: bold;
  color: ${({ color }) => color || "#ffffff"};
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const Unit = styled.span`
  font-size: 20px;
  margin-left: 5px;
  color: rgba(255, 255, 255, 0.7);
`;

const StatusText = styled.p`
  font-size: 22px;
  font-weight: bold;
  color: ${({ color }) => color};
  margin: 10px 0;
`;

const RelayButton = styled.button`
  background: ${({ active }) => (active ? "#4CAF50" : "#d32f2f")};
  color: white;
  padding: 12px 18px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: background 0.3s ease-in-out, transform 0.2s ease;
  margin: 8px 0;
  opacity: ${({ disabled }) => (disabled ? "0.7" : "1")};
  width: 100%;

  &:hover {
    background: ${({ active, disabled }) => (!disabled ? (active ? "#388E3C" : "#B71C1C") : null)};
    transform: ${({ disabled }) => (!disabled ? "scale(1.02)" : "none")};
  }
`;

const ToggleButton = styled.button`
  background: ${({ active }) => (active ? "#FF8C00" : "#3498db")};
  color: white;
  padding: 14px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;
  margin-bottom: 15px;
  width: 100%;

  &:hover {
    background: ${({ active }) => (active ? "#F57C00" : "#2980b9")};
    transform: scale(1.02);
  }
`;

const GraphContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  height: 400px;
  margin: 30px auto;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const RelayGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 15px;
  width: 100%;
`;

const ModeLabel = styled.div`
  background: ${({ active }) => (active ? "rgba(255, 140, 0, 0.2)" : "rgba(52, 152, 219, 0.2)")};
  color: ${({ active }) => (active ? "#FF8C00" : "#3498db")};
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  margin-top: 10px;
`;

const InfoText = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  margin-top: 5px;
`;

const AlertBanner = styled.div`
  background: rgba(231, 76, 60, 0.2);
  color: #e74c3c;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid rgba(231, 76, 60, 0.3);
`;

function Dashboard() {
  const [activePage, setActivePage] = useState('dashboard');
  const [sensorDHTData, setSensorDHTData] = useState({ temperature: 0, humidity: 0 });
  const [pirStatus, setPirStatus] = useState(false);
  const [relayStatus, setRelayStatus] = useState({
    relay1: false,
    relay2: false,
    relay3: false,
    relay4: false,
  });
  const [sensorDHTHistory, setSensorDHTHistory] = useState([]);
  const [distance, setDistance] = useState(100);
  const [manualControl, setManualControl] = useState(false);
  // const [airQuality, setAirQuality] = useState(0);
  const [alerts, setAlerts] = useState([]);

  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    try {
      // const [sensorDHTRes, pirRes, relayRes, historyDHTRes, distanceRes, airQualityRes, alertsRes] = 
      const [sensorDHTRes, pirRes, relayRes, historyDHTRes, distanceRes] = 
        await Promise.all([
          fetch(`${import.meta.env.VITE_BACKEND_URL}/dht/latest`),
          fetch(`${import.meta.env.VITE_BACKEND_URL}/pir`),
          fetch(`${import.meta.env.VITE_BACKEND_URL}/relays`),
          fetch(`${import.meta.env.VITE_BACKEND_URL}/dht/history`),
          fetch(`${import.meta.env.VITE_BACKEND_URL}/ultrasonic`),
          // fetch(`${import.meta.env.VITE_BACKEND_URL}/airquality`),
          // fetch(`${import.meta.env.VITE_BACKEND_URL}/alerts`),
        ]);

      setSensorDHTData(await sensorDHTRes.json());
      setPirStatus((await pirRes.json()).motionDetected);
      setRelayStatus(await relayRes.json());
      setDistance((await distanceRes.json()).distance);
      // setAirQuality(0);
      // setAlerts((await alertsRes.json()).filter(alert => !alert.resolved));

      if (!manualControl) {
        setRelayStatus((prevState) => ({
          ...prevState,
          relay1: sensorDHTData.humidity < 40,
          relay3: sensorDHTData.temperature > 20,
          relay4: distance < 15 && distance >= 0,
        }));
      }

      const historyDHTData = await historyDHTRes.json();
      setSensorDHTHistory(
        historyDHTData.map((item) => ({
          ...item,
          timestamp: new Date(item.timestamp).toLocaleTimeString(),
        }))
      );

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [manualControl, sensorDHTData.temperature, sensorDHTData.humidity, distance]);

  const toggleRelay = async (relayNumber) => {
    if (!manualControl) return;

    const newStatus = {
      ...relayStatus,
      [`relay${relayNumber}`]: !relayStatus[`relay${relayNumber}`],
    };

    try {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/relays`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStatus),
      });

      setRelayStatus(newStatus);
    } catch (error) {
      console.error("Error toggling relay:", error);
    }
  };

  const handleNavClick = (page) => {
    setActivePage(page);
    navigate(`/${page}`);
  };
  
  useEffect(() => {
    const path = window.location.pathname;
    const currentPage = path === '/' ? 'dashboard' : path.substring(1);
    setActivePage(currentPage);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/login";
  };


  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, [manualControl, fetchData]);

  // Mock function to dismiss alerts once the endpoint is ready
  const dismissAlert = (alertId) => {
    setAlerts(alerts.filter(alert => alert.id !== alertId));
  };

  return (
    <>
      <NavbarComponent 
        activePage={activePage} 
        handleNavClick={handleNavClick} 
        handleLogout={handleLogout} 
      />
      <MainContent>
        <Heading>Digital IoT Platform for ESP32 based devices</Heading>

        {/* Alert Banner */}
        {alerts.length > 0 && (
          <AlertBanner>
            <div>
              <strong>Alert:</strong> {alerts[0].message}
            </div>
            <button 
              onClick={() => dismissAlert(alerts[0].id)}
              style={{
                background: "transparent",
                border: "1px solid #e74c3c",
                color: "#e74c3c",
                borderRadius: "4px",
                padding: "5px 10px",
                cursor: "pointer"
              }}
            >
              Dismiss
            </button>
          </AlertBanner>
        )}

        <Grid>
          {/* Temperature Card */}
          <SensorCard background="linear-gradient(135deg, rgba(255, 75, 75, 0.2), rgba(255, 95, 109, 0.4))">
            <Title>Temperature</Title>
            <SensorValue>
              <Value color="#ff5f6d">{sensorDHTData.temperature}</Value>
              <Unit>°C</Unit>
            </SensorValue>
            <InfoText>
              {sensorDHTData.temperature > 25 ? "High" : sensorDHTData.temperature < 18 ? "Low" : "Normal"}
            </InfoText>
          </SensorCard>

          {/* Humidity Card */}
          <SensorCard background="linear-gradient(135deg, rgba(52, 152, 219, 0.2), rgba(41, 128, 185, 0.4))">
            <Title>Humidity</Title>
            <SensorValue>
              <Value color="#3498db">{sensorDHTData.humidity}</Value>
              <Unit>%</Unit>
            </SensorValue>
            <InfoText>
              {sensorDHTData.humidity > 60 ? "High" : sensorDHTData.humidity < 30 ? "Low" : "Normal"}
            </InfoText>
          </SensorCard>

          {/* Air Quality Card */}
          {/* <SensorCard background="linear-gradient(135deg, rgba(155, 89, 182, 0.2), rgba(142, 68, 173, 0.4))">
            <Title>Air Quality</Title>
            <SensorValue>
              <Value color="#9b59b6">{airQuality}</Value>
              <Unit>ppm</Unit>
            </SensorValue>
            <InfoText>
              {airQuality > 200 ? "Poor" : airQuality > 100 ? "Moderate" : "Good"}
            </InfoText>
          </SensorCard> */}

          {/* Distance Card */}
          <SensorCard background="linear-gradient(135deg, rgba(46, 204, 113, 0.2), rgba(39, 174, 96, 0.4))">
            <Title>Distance Sensor</Title>
            <SensorValue>
              <Value color="#2ecc71">{distance}</Value>
              <Unit>cm</Unit>
            </SensorValue>
            <InfoText>
              {distance < 15 && distance >= 0 ? "Object very close" : distance < 50 && distance >= 15 ? "Object nearby" : "Object not in detection range"}
            </InfoText>
          </SensorCard>

          {/* Motion Detection */}
          <Card>
            <Title>Motion Detection</Title>
            <StatusText color={pirStatus ? "#4CAF50" : "#f44336"}>
              {pirStatus ? "Motion Detected" : "No Motion"}
            </StatusText>
          </Card>

          {/* Toggle Button Card */}
          <Card>
            <Title>Control Mode</Title>
            <ToggleButton active={manualControl} onClick={() => setManualControl(!manualControl)}>
              {manualControl ? "Manual Mode" : "Auto Mode"}
            </ToggleButton>
            <ModeLabel active={manualControl}>
              {manualControl ? "Manual Control Enabled" : "Automatic Control Active"}
            </ModeLabel>
          </Card>

          {/* Relay Controls */}
          <Card>
            <Title>Relays</Title>
            <RelayGrid>
              {[1, 2, 3, 4].map((num) => (
                <RelayButton 
                  key={num} 
                  active={relayStatus[`relay${num}`]} 
                  onClick={() => toggleRelay(num)}
                  disabled={!manualControl}
                >
                  Relay {num} {relayStatus[`relay${num}`] ? "ON" : "OFF"}
                </RelayButton>
              ))}
            </RelayGrid>
            {!manualControl && (
              <InfoText>Switch to Manual Mode to control relays</InfoText>
            )}
          </Card>
        </Grid>

        {/* Graph */}
        <GraphContainer>
          <Title>Temperature & Humidity History</Title>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sensorDHTHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="timestamp" 
                stroke="rgba(255,255,255,0.5)"
                tick={{ fill: 'rgba(255,255,255,0.7)' }}
              />
              <YAxis 
                stroke="rgba(255,255,255,0.5)"
                tick={{ fill: 'rgba(255,255,255,0.7)' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(0,0,0,0.8)', 
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Legend 
                wrapperStyle={{ color: 'rgba(255,255,255,0.7)' }}
              />
              <Line
                type="monotone"
                dataKey="temperature"
                stroke="#ff7300"
                name="Temperature (°C)"
                strokeWidth={2}
                dot={{ r: 3, fill: '#ff7300' }}
                activeDot={{ r: 5, stroke: '#fff' }}
              />
              <Line
                type="monotone"
                dataKey="humidity"
                stroke="#0088FE"
                name="Humidity (%)"
                strokeWidth={2}
                dot={{ r: 3, fill: '#0088FE' }}
                activeDot={{ r: 5, stroke: '#fff' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </GraphContainer>
      </MainContent>
      <FooterComponent />
    </>
  );
}

export default Dashboard;