import { useEffect, useState } from "react";
import styled from "styled-components";
import { NavbarComponent, FooterComponent } from "../components/layout";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar,
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Legend, 
  CartesianGrid,
  PieChart,
  Pie,
  Cell
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

const GraphContainer = styled.div`
  width: 100%;
  height: 400px;
  margin: 30px auto;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const GraphTitle = styled.h2`
  color: rgba(255, 255, 255, 0.9);
  font-size: 20px;
  margin-bottom: 15px;
`;

const Tabs = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  justify-content: center;
`;

const Tab = styled.button`
  background: ${({ active }) => (active ? "#3498db" : "rgba(255, 255, 255, 0.1)")};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${({ active }) => (active ? "#2980b9" : "rgba(255, 255, 255, 0.2)")};
  }
`;

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

function AnalyticsPage() {
    const [activePage, setActivePage] = useState('devices');
  const [activeTab, setActiveTab] = useState('temperature');

  // Sample data
  const temperatureData = [
    { name: 'Mon', temp: 22 },
    { name: 'Tue', temp: 24 },
    { name: 'Wed', temp: 25 },
    { name: 'Thu', temp: 23 },
    { name: 'Fri', temp: 21 },
    { name: 'Sat', temp: 20 },
    { name: 'Sun', temp: 19 }
  ];

  const humidityData = [
    { name: 'Mon', humidity: 45 },
    { name: 'Tue', humidity: 50 },
    { name: 'Wed', humidity: 55 },
    { name: 'Thu', humidity: 48 },
    { name: 'Fri', humidity: 42 },
    { name: 'Sat', humidity: 40 },
    { name: 'Sun', humidity: 38 }
  ];

  const motionData = [
    { name: '00:00', motion: 2 },
    { name: '04:00', motion: 0 },
    { name: '08:00', motion: 15 },
    { name: '12:00', motion: 20 },
    { name: '16:00', motion: 18 },
    { name: '20:00', motion: 10 },
    { name: '24:00', motion: 3 }
  ];

  const deviceUsageData = [
    { name: 'ESP32', value: 35 },
    { name: 'Sensors', value: 25 },
    { name: 'Relays', value: 20 },
    { name: 'Network', value: 15 },
    { name: 'Other', value: 5 }
  ];

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

  return (
    <>
      <NavbarComponent 
        activePage={activePage} 
        handleNavClick={handleNavClick} 
        handleLogout={handleLogout} 
      />
      <MainContent>
        <Heading>Data Analytics</Heading>
        
        <Tabs>
          <Tab 
            active={activeTab === 'temperature'} 
            onClick={() => setActiveTab('temperature')}
          >
            Temperature
          </Tab>
          <Tab 
            active={activeTab === 'humidity'} 
            onClick={() => setActiveTab('humidity')}
          >
            Humidity
          </Tab>
          <Tab 
            active={activeTab === 'motion'} 
            onClick={() => setActiveTab('motion')}
          >
            Motion
          </Tab>
          <Tab 
            active={activeTab === 'usage'} 
            onClick={() => setActiveTab('usage')}
          >
            Device Usage
          </Tab>
        </Tabs>

        {activeTab === 'temperature' && (
          <>
            <GraphContainer>
              <GraphTitle>Temperature Trends (Last 7 Days)</GraphTitle>
              <ResponsiveContainer width="100%" height="90%">
                <LineChart data={temperatureData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(0,0,0,0.8)', 
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="temp" 
                    stroke="#ff7300" 
                    strokeWidth={2} 
                    activeDot={{ r: 8 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </GraphContainer>
          </>
        )}

        {activeTab === 'humidity' && (
          <>
            <GraphContainer>
              <GraphTitle>Humidity Trends (Last 7 Days)</GraphTitle>
              <ResponsiveContainer width="100%" height="90%">
                <BarChart data={humidityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(0,0,0,0.8)', 
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                  <Bar dataKey="humidity" fill="#0088FE" />
                </BarChart>
              </ResponsiveContainer>
            </GraphContainer>
          </>
        )}

        {activeTab === 'motion' && (
          <>
            <GraphContainer>
              <GraphTitle>Motion Detection (Today)</GraphTitle>
              <ResponsiveContainer width="100%" height="90%">
                <LineChart data={motionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(0,0,0,0.8)', 
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="motion" 
                    stroke="#4CAF50" 
                    strokeWidth={2} 
                    activeDot={{ r: 8 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </GraphContainer>
          </>
        )}

        {activeTab === 'usage' && (
          <>
            <GraphContainer>
              <GraphTitle>Device Resource Usage</GraphTitle>
              <ResponsiveContainer width="100%" height="90%">
                <PieChart>
                  <Pie
                    data={deviceUsageData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {deviceUsageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(0,0,0,0.8)', 
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </GraphContainer>
          </>
        )}
      </MainContent>
      <FooterComponent />
    </>
  );
}

export default AnalyticsPage;