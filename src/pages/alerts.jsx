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

const AlertGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin: 0 auto;
  max-width: 1200px;
`;

const AlertCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid ${({ severity }) => 
    severity === 'high' ? 'rgba(231, 76, 60, 0.3)' : 
    severity === 'medium' ? 'rgba(241, 196, 15, 0.3)' : 
    'rgba(46, 204, 113, 0.3)'};
  transition: transform 0.2s ease-in-out;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const AlertHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const AlertTitle = styled.h3`
  color: rgba(255, 255, 255, 0.9);
  font-size: 18px;
`;

const AlertSeverity = styled.span`
  background: ${({ severity }) => 
    severity === 'high' ? 'rgba(231, 76, 60, 0.2)' : 
    severity === 'medium' ? 'rgba(241, 196, 15, 0.2)' : 
    'rgba(46, 204, 113, 0.2)'};
  color: ${({ severity }) => 
    severity === 'high' ? '#e74c3c' : 
    severity === 'medium' ? '#f1c40f' : 
    '#2ecc71'};
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
`;

const AlertBody = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  margin-bottom: 15px;
`;

const AlertTime = styled.div`
  color: rgba(255, 255, 255, 0.5);
  font-size: 12px;
  text-align: right;
`;

const AlertActions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;
`;

const AlertButton = styled.button`
  background: ${({ variant }) => 
    variant === 'primary' ? 'rgba(52, 152, 219, 0.2)' : 
    'rgba(255, 255, 255, 0.1)'};
  color: ${({ variant }) => 
    variant === 'primary' ? '#3498db' : 'rgba(255, 255, 255, 0.7)'};
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: ${({ variant }) => 
      variant === 'primary' ? 'rgba(52, 152, 219, 0.3)' : 
      'rgba(255, 255, 255, 0.2)'};
  }
`;

const NoAlerts = styled.div`
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  font-size: 18px;
  margin: 50px 0;
`;

function AlertsPage() {
  const [activePage, setActivePage] = useState('devices');
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      title: "High Temperature Alert",
      message: "Temperature exceeded 30°C in the living room",
      severity: "high",
      time: "10 minutes ago",
      resolved: false,
      device: "Living Room Sensor"
    },
    {
      id: 2,
      title: "Motion Detected",
      message: "Motion detected in the backyard during night hours",
      severity: "medium",
      time: "2 hours ago",
      resolved: false,
      device: "Backyard Camera"
    },
    {
      id: 3,
      title: "Low Humidity",
      message: "Humidity dropped below 30% in the greenhouse",
      severity: "medium",
      time: "5 hours ago",
      resolved: true,
      device: "Greenhouse Sensor"
    },
    {
      id: 4,
      title: "Device Offline",
      message: "Kitchen sensor has been offline for more than 1 hour",
      severity: "high",
      time: "1 day ago",
      resolved: false,
      device: "Kitchen Sensor"
    },
    {
      id: 5,
      title: "Water Leak Detected",
      message: "Potential water leak detected in the basement",
      severity: "high",
      time: "2 days ago",
      resolved: true,
      device: "Basement Sensor"
    },
    {
      id: 6,
      title: "System Update Available",
      message: "New firmware version available for your devices",
      severity: "low",
      time: "3 days ago",
      resolved: false,
      device: "System"
    }
  ]);

  const [filter, setFilter] = useState("all");

  const handleResolve = (alertId) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? {...alert, resolved: true} : alert
    ));
  };

  const handleDelete = (alertId) => {
    setAlerts(alerts.filter(alert => alert.id !== alertId));
  };

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

  const filteredAlerts = alerts.filter(alert => {
    if (filter === "all") return true;
    if (filter === "resolved") return alert.resolved;
    if (filter === "unresolved") return !alert.resolved;
    if (filter === "high") return alert.severity === "high";
    if (filter === "medium") return alert.severity === "medium";
    if (filter === "low") return alert.severity === "low";
    return true;
  });

  return (
    <>
      <NavbarComponent 
        activePage={activePage} 
        handleNavClick={handleNavClick} 
        handleLogout={handleLogout} 
      />
      <MainContent>
        <Heading>Alerts & Notifications</Heading>
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '10px', 
          marginBottom: '20px' 
        }}>
          <AlertButton 
            active={filter === "all"} 
            onClick={() => setFilter("all")}
          >
            All Alerts
          </AlertButton>
          <AlertButton 
            active={filter === "unresolved"} 
            onClick={() => setFilter("unresolved")}
          >
            Unresolved
          </AlertButton>
          <AlertButton 
            active={filter === "resolved"} 
            onClick={() => setFilter("resolved")}
          >
            Resolved
          </AlertButton>
          <AlertButton 
            active={filter === "high"} 
            onClick={() => setFilter("high")}
          >
            High Priority
          </AlertButton>
        </div>
        
        {filteredAlerts.length > 0 ? (
          <AlertGrid>
            {filteredAlerts.map(alert => (
              <AlertCard key={alert.id} severity={alert.severity}>
                <AlertHeader>
                  <AlertTitle>{alert.title}</AlertTitle>
                  <AlertSeverity severity={alert.severity}>
                    {alert.severity.toUpperCase()}
                  </AlertSeverity>
                </AlertHeader>
                
                <AlertBody>
                  <p>{alert.message}</p>
                  <p><strong>Device:</strong> {alert.device}</p>
                </AlertBody>
                
                <AlertTime>{alert.time}</AlertTime>
                
                {!alert.resolved && (
                  <AlertActions>
                    <AlertButton 
                      variant="primary" 
                      onClick={() => handleResolve(alert.id)}
                    >
                      Mark as Resolved
                    </AlertButton>
                    <AlertButton onClick={() => handleDelete(alert.id)}>
                      Dismiss
                    </AlertButton>
                  </AlertActions>
                )}
              </AlertCard>
            ))}
          </AlertGrid>
        ) : (
          <NoAlerts>No alerts to display</NoAlerts>
        )}
      </MainContent>
      <FooterComponent />
    </>
  );
}

export default AlertsPage;