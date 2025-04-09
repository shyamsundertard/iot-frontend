import { useEffect, useState } from "react";
import styled from "styled-components";
import { NavbarComponent, FooterComponent } from "../components/layout";
import { useNavigate } from "react-router-dom";

const MainContent = styled.main`
  flex: 1;
  padding: 20px;
  max-width: 800px;
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

const SettingsSection = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 25px;
  margin-bottom: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const SectionTitle = styled.h2`
  color: rgba(255, 255, 255, 0.9);
  font-size: 20px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 16px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 15px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: white;
  font-size: 16px;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.3);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 15px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: white;
  font-size: 16px;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.3);
  }
`;

const Button = styled.button`
  background: #3498db;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 10px;

  &:hover {
    background: #2980b9;
    transform: translateY(-2px);
  }
`;

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
`;

const ToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
  }
`;

const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + ${ToggleSlider} {
    background-color: #4CAF50;
  }

  &:focus + ${ToggleSlider} {
    box-shadow: 0 0 1px #4CAF50;
  }

  &:checked + ${ToggleSlider}:before {
    transform: translateX(26px);
  }
`;

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

function SettingsPage() {
    const [activePage, setActivePage] = useState('devices');
  const [settings, setSettings] = useState({
    email: "user@example.com",
    notifications: true,
    theme: "dark",
    refreshInterval: 5,
    units: "metric",
    apiKey: "********",
    autoUpdate: true
  });

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Settings saved successfully!");
    // In a real app, you would send these to your backend
  };

  return (
    <>
      <NavbarComponent 
        activePage={activePage} 
        handleNavClick={handleNavClick} 
        handleLogout={handleLogout} 
      />
      <MainContent>
        <Heading>Settings</Heading>
        
        <form onSubmit={handleSubmit}>
          <SettingsSection>
            <SectionTitle>User Preferences</SectionTitle>
            
            <FormGroup>
              <Label>Email Address</Label>
              <Input 
                type="email" 
                name="email" 
                value={settings.email} 
                onChange={handleChange} 
                required 
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Theme</Label>
              <Select 
                name="theme" 
                value={settings.theme} 
                onChange={handleChange}
              >
                <option value="dark">Dark</option>
                <option value="light">Light</option>
                <option value="system">System Default</option>
              </Select>
            </FormGroup>
            
            <FormGroup>
              <Label>Units</Label>
              <Select 
                name="units" 
                value={settings.units} 
                onChange={handleChange}
              >
                <option value="metric">Metric (°C, cm)</option>
                <option value="imperial">Imperial (°F, in)</option>
              </Select>
            </FormGroup>
          </SettingsSection>
          
          <SettingsSection>
            <SectionTitle>Notification Settings</SectionTitle>
            
            <ToggleContainer>
              <ToggleSwitch>
                <ToggleInput 
                  type="checkbox" 
                  name="notifications" 
                  checked={settings.notifications} 
                  onChange={handleChange} 
                />
                <ToggleSlider />
              </ToggleSwitch>
              <span>Email Notifications</span>
            </ToggleContainer>
          </SettingsSection>
          
          <SettingsSection>
            <SectionTitle>System Settings</SectionTitle>
            
            <FormGroup>
              <Label>Data Refresh Interval (seconds)</Label>
              <Input 
                type="number" 
                name="refreshInterval" 
                min="1" 
                max="60" 
                value={settings.refreshInterval} 
                onChange={handleChange} 
              />
            </FormGroup>
            
            <ToggleContainer>
              <ToggleSwitch>
                <ToggleInput 
                  type="checkbox" 
                  name="autoUpdate" 
                  checked={settings.autoUpdate} 
                  onChange={handleChange} 
                />
                <ToggleSlider />
              </ToggleSwitch>
              <span>Automatic Updates</span>
            </ToggleContainer>
          </SettingsSection>
          
          <SettingsSection>
            <SectionTitle>API Settings</SectionTitle>
            
            <FormGroup>
              <Label>API Key</Label>
              <Input 
                type="text" 
                name="apiKey" 
                value={settings.apiKey} 
                onChange={handleChange} 
                readOnly 
              />
            </FormGroup>
            
            <Button type="button" style={{ background: "#e74c3c", marginRight: "10px" }}>
              Regenerate Key
            </Button>
            <Button type="button" style={{ background: "#2ecc71" }}>
              View Documentation
            </Button>
          </SettingsSection>
          
          <Button type="submit">Save Settings</Button>
        </form>
      </MainContent>
      <FooterComponent />
    </>
  );
}

export default SettingsPage;