import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { NavbarComponent } from "../components/layout";

const OverviewContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.h1`
  font-size: 2.5rem;
  color: #f2f4f7;
  margin-bottom: 2rem;
  text-align: center;
`;

const SubHeader = styled.h2`
  font-size: 1.8rem;
  color: #3498db;
  margin: 1.5rem 0;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const OverviewCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    background: rgba(255, 255, 255, 0.08);
  }
`;

const CardTitle = styled.h3`
  font-size: 1.3rem;
  color: #f2f4f7;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CardDescription = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.95rem;
  line-height: 1.5;
`;

const QuickStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: ${props => props.color || "#3498db"};
  margin: 0.5rem 0;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
`;

const RecentActivity = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1.5rem;
  margin-top: 2rem;
`;

const ActivityItem = styled.div`
  padding: 0.8rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  
  &:last-child {
    border-bottom: none;
  }
`;

function OverviewPage() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('overview');
  const [quickStats] = useState({
    devices: 4,
    alerts: 2,
    activeSensors: 3,
    automationRules: 5
  });

  const [recentActivities] = useState([
    { id: 1, event: "Temperature threshold exceeded", time: "2 minutes ago", device: "DHT22" },
    { id: 2, event: "Motion detected", time: "5 minutes ago", device: "PIR Sensor" },
    { id: 3, event: "Relay 1 turned ON", time: "15 minutes ago", device: "Relay Module" },
    { id: 4, event: "New device connected", time: "1 hour ago", device: "Ultrasonic Sensor" }
  ]);

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

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <>
    <NavbarComponent 
        activePage={activePage} 
        handleNavClick={handleNavClick} 
        handleLogout={handleLogout} 
      />
    <OverviewContainer>
      <Header>IoT Platform Overview</Header>
      
      <QuickStats>
        <StatCard>
          <StatLabel>Connected Devices</StatLabel>
          <StatValue>{quickStats.devices}</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>Active Alerts</StatLabel>
          <StatValue color="#ff5f6d">{quickStats.alerts}</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>Active Sensors</StatLabel>
          <StatValue color="#2ecc71">{quickStats.activeSensors}</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>Automation Rules</StatLabel>
          <StatValue color="#f39c12">{quickStats.automationRules}</StatValue>
        </StatCard>
      </QuickStats>
      
      <SubHeader>Platform Modules</SubHeader>
      <CardGrid>
        <OverviewCard onClick={() => handleCardClick("/dashboard")}>
          <CardTitle>📊 Dashboard</CardTitle>
          <CardDescription>
            Real-time monitoring of all your IoT devices and sensors with interactive controls.
          </CardDescription>
        </OverviewCard>
        
        <OverviewCard onClick={() => handleCardClick("/devices")}>
          <CardTitle>📱 Device Management</CardTitle>
          <CardDescription>
            Manage all connected devices, configure settings, and view device details.
          </CardDescription>
        </OverviewCard>
        
        <OverviewCard onClick={() => handleCardClick("/analytics")}>
          <CardTitle>📈 Data Analytics</CardTitle>
          <CardDescription>
            Historical data analysis, trends visualization, and export capabilities.
          </CardDescription>
        </OverviewCard>
        
        <OverviewCard onClick={() => handleCardClick("/notifications")}>
          <CardTitle>🔔 Notifications</CardTitle>
          <CardDescription>
            View and manage alerts, notifications, and system events.
          </CardDescription>
        </OverviewCard>
      </CardGrid>
      
      <SubHeader>Recent Activity</SubHeader>
      <RecentActivity>
        {recentActivities.map(activity => (
          <ActivityItem key={activity.id}>
            <div>
              <strong>{activity.event}</strong>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem' }}>{activity.device}</div>
            </div>
            <div style={{ color: 'rgba(255,255,255,0.7)' }}>{activity.time}</div>
          </ActivityItem>
        ))}
      </RecentActivity>
    </OverviewContainer>
    </>
  );
}

export default OverviewPage;