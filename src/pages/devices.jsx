import { useEffect, useState } from "react";
import styled from "styled-components";
import { NavbarComponent, FooterComponent } from "../components/layout";
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

const DeviceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  margin: 0 auto;
  max-width: 1200px;
`;

const DeviceCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }
`;

const DeviceTitle = styled.h3`
  color: rgba(255, 255, 255, 0.9);
  font-size: 18px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const DeviceStatus = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const StatusIndicator = styled.span`
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${({ online }) => (online ? "#4CAF50" : "#f44336")};
`;

const DeviceInfo = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  margin-bottom: 10px;
`;

const DeviceActions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;
`;

const ActionButton = styled.button`
  background: ${({ variant }) => 
    variant === 'primary' ? '#3498db' : 
    variant === 'danger' ? '#e74c3c' : 'rgba(255, 255, 255, 0.1)'};
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
`;

function DevicesPage() {
    const [activePage, setActivePage] = useState('devices');
  const [devices, setDevices] = useState([
    {
      id: 1,
      name: "ESP32 Main Controller",
      type: "Microcontroller",
      status: "online",
      ip: "192.168.1.100",
      lastSeen: "2 minutes ago",
      firmware: "v1.2.3"
    },
    {
      id: 2,
      name: "Temperature Sensor",
      type: "DHT22",
      status: "online",
      ip: "192.168.1.101",
      lastSeen: "1 minute ago",
      firmware: "v1.0.1"
    },
    {
      id: 3,
      name: "Motion Sensor",
      type: "PIR",
      status: "offline",
      ip: "192.168.1.102",
      lastSeen: "15 minutes ago",
      firmware: "v0.9.5"
    },
    {
      id: 4,
      name: "Smart Relay",
      type: "4-Channel Relay",
      status: "online",
      ip: "192.168.1.103",
      lastSeen: "30 seconds ago",
      firmware: "v1.1.0"
    },
    {
      id: 5,
      name: "Distance Sensor",
      type: "HC-SR04",
      status: "online",
      ip: "192.168.1.104",
      lastSeen: "45 seconds ago",
      firmware: "v1.0.2"
    },
    {
      id: 6,
      name: "Air Quality Sensor",
      type: "MQ-135",
      status: "offline",
      ip: "192.168.1.105",
      lastSeen: "1 hour ago",
      firmware: "v0.8.3"
    }
  ]);

  const navigate = useNavigate();

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

  const handleRestart = (deviceId) => {
    // In a real app, this would call your API
    alert(`Restarting device ${deviceId}`);
    setDevices(devices.map(device => 
      device.id === deviceId ? {...device, status: "restarting"} : device
    ));
  };

  const handleRemove = (deviceId) => {
    // In a real app, this would call your API
    if (confirm("Are you sure you want to remove this device?")) {
      setDevices(devices.filter(device => device.id !== deviceId));
    }
  };

  return (
    <>
       <NavbarComponent 
        activePage={activePage} 
        handleNavClick={handleNavClick} 
        handleLogout={handleLogout} 
      />
      <MainContent>
        <Heading>Connected Devices</Heading>
        
        <DeviceGrid>
          {devices.map(device => (
            <DeviceCard key={device.id}>
              <DeviceTitle>
                {device.name}
                <StatusIndicator online={device.status === "online"} />
              </DeviceTitle>
              
              <DeviceStatus>
                <span>{device.type}</span>
                <span style={{ 
                  color: device.status === "online" ? "#4CAF50" : "#f44336",
                  fontWeight: 500
                }}>
                  {device.status.toUpperCase()}
                </span>
              </DeviceStatus>
              
              <DeviceInfo>
                <div>IP: {device.ip}</div>
                <div>Last seen: {device.lastSeen}</div>
                <div>Firmware: {device.firmware}</div>
              </DeviceInfo>
              
              <DeviceActions>
                <ActionButton variant="primary">Details</ActionButton>
                <ActionButton onClick={() => handleRestart(device.id)}>Restart</ActionButton>
                <ActionButton variant="danger" onClick={() => handleRemove(device.id)}>Remove</ActionButton>
              </DeviceActions>
            </DeviceCard>
          ))}
        </DeviceGrid>
      </MainContent>
      <FooterComponent />
    </>
  );
}

export default DevicesPage;