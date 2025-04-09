import { useEffect, useState } from "react";
import styled from "styled-components";
import { NavbarComponent, FooterComponent } from "../components/layout";
import { useNavigate } from "react-router-dom";

const MainContent = styled.main`
  flex: 1;
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
`;

const Heading = styled.h1`
  text-align: center;
  font-size: 32px;
  font-weight: 700;
  color: #f2f4f7;
  margin-bottom: 30px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const DocContainer = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const DocSection = styled.div`
  margin-bottom: 30px;
`;

const DocTitle = styled.h2`
  color: rgba(255, 255, 255, 0.9);
  font-size: 24px;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const DocSubtitle = styled.h3`
  color: rgba(255, 255, 255, 0.8);
  font-size: 20px;
  margin: 20px 0 10px 0;
`;

const DocText = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 15px;
`;

const CodeBlock = styled.pre`
  background: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  padding: 15px;
  overflow-x: auto;
  font-family: 'Courier New', Courier, monospace;
  color: #f8f8f2;
  margin: 15px 0;
`;

const List = styled.ul`
  color: rgba(255, 255, 255, 0.7);
  padding-left: 20px;
  margin: 15px 0;
`;

const ListItem = styled.li`
  margin-bottom: 8px;
`;

const TabContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
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

function DocumentationPage() {
    const [activePage, setActivePage] = useState('devices');
  const [activeTab, setActiveTab] = useState("getting-started");

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
        <Heading>Documentation</Heading>
        
        <TabContainer>
          <Tab 
            active={activeTab === "getting-started"} 
            onClick={() => setActiveTab("getting-started")}
          >
            Getting Started
          </Tab>
          <Tab 
            active={activeTab === "api"} 
            onClick={() => setActiveTab("api")}
          >
            API Reference
          </Tab>
          <Tab 
            active={activeTab === "faq"} 
            onClick={() => setActiveTab("faq")}
          >
            FAQ
          </Tab>
        </TabContainer>
        
        <DocContainer>
          {activeTab === "getting-started" && (
            <DocSection>
              <DocTitle>Getting Started with IoT Dashboard</DocTitle>
              <DocText>
                Welcome to the IoT Dashboard documentation. This guide will help you set up and 
                configure your IoT devices to work with our platform.
              </DocText>
              
              <DocSubtitle>1. Prerequisites</DocSubtitle>
              <List>
                <ListItem>ESP32 or similar microcontroller</ListItem>
                <ListItem>Supported sensors (DHT22, PIR, etc.)</ListItem>
                <ListItem>WiFi network access</ListItem>
                <ListItem>Basic knowledge of Arduino programming</ListItem>
              </List>
              
              <DocSubtitle>2. Installation</DocSubtitle>
              <DocText>
                To get started, follow these steps to flash the firmware to your device:
              </DocText>
              <CodeBlock>
{`1. Download the latest firmware from our GitHub repository
2. Open Arduino IDE and install required libraries
3. Configure the WiFi credentials in config.h
4. Upload the firmware to your device
5. The device should now connect to your dashboard automatically`}
              </CodeBlock>
              
              <DocSubtitle>3. Connecting to Dashboard</DocSubtitle>
              <DocText>
                Once your device is powered on and connected to WiFi, it will automatically 
                appear in the Devices section of your dashboard. You may need to refresh 
                the page if it doesn&apos;t appear immediately.
              </DocText>
            </DocSection>
          )}
          
          {activeTab === "api" && (
            <DocSection>
              <DocTitle>API Reference</DocTitle>
              <DocText>
                Our platform provides a RESTful API for integrating with other services and 
                building custom applications.
              </DocText>
              
              <DocSubtitle>Base URL</DocSubtitle>
              <CodeBlock>{`https://api.iotdashboard.com/v1`}</CodeBlock>
              
              <DocSubtitle>Authentication</DocSubtitle>
              <DocText>
                All API requests require an API key in the header:
              </DocText>
              <CodeBlock>{`Authorization: Bearer YOUR_API_KEY`}</CodeBlock>
              
              <DocSubtitle>Endpoints</DocSubtitle>
              <DocText>
                <strong>GET /devices</strong> - List all connected devices
              </DocText>
              <CodeBlock>
{`// Example response
[
  {
    "id": "device-123",
    "name": "Living Room Sensor",
    "type": "ESP32",
    "status": "online",
    "lastSeen": "2023-05-15T14:30:00Z"
  }
]`}
              </CodeBlock>
              
              <DocText>
                <strong>GET /devices/:id/sensors</strong> - Get sensor data for a device
              </DocText>
              <CodeBlock>
{`// Example response
{
  "temperature": 22.5,
  "humidity": 45,
  "motion": false,
  "timestamp": "2023-05-15T14:30:00Z"
}`}
              </CodeBlock>
              
              <DocText>
                <strong>POST /devices/:id/relays</strong> - Control relay devices
              </DocText>
              <CodeBlock>
{`// Example request
{
  "relay1": true,
  "relay2": false
}`}
              </CodeBlock>
            </DocSection>
          )}
          
          {activeTab === "faq" && (
            <DocSection>
              <DocTitle>Frequently Asked Questions</DocTitle>
              
              <DocSubtitle>How do I reset my device?</DocSubtitle>
              <DocText>
                Press and hold the BOOT button for 5 seconds until the LED flashes rapidly. 
                This will reset all settings to factory defaults.
              </DocText>
              
              <DocSubtitle>Why isn&apos;t my device showing up in the dashboard?</DocSubtitle>
              <DocText>
                First, verify that your device is connected to WiFi and has internet access. 
                Check the serial monitor output for any error messages. If the problem persists, 
                try re-flashing the firmware.
              </DocText>
              
              <DocSubtitle>How often does the dashboard update?</DocSubtitle>
              <DocText>
                By default, the dashboard updates every 5 seconds. You can change this interval 
                in the Settings page.
              </DocText>
              
              <DocSubtitle>Can I use different sensors than the ones listed?</DocSubtitle>
              <DocText>
                Yes, but you&apos;ll need to modify the firmware to support your specific sensors. 
                Refer to the API documentation for adding custom sensor support.
              </DocText>
              
              <DocSubtitle>Is there a mobile app available?</DocSubtitle>
              <DocText>
                Currently, we don&apos;t have a dedicated mobile app, but the dashboard is fully 
                responsive and works well on mobile browsers.
              </DocText>
            </DocSection>
          )}
        </DocContainer>
      </MainContent>
      <FooterComponent />
    </>
  );
}

export default DocumentationPage;