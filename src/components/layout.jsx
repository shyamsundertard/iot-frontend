import PropTypes from 'prop-types';
import styled from "styled-components";

export const Navbar = styled.nav`
  width: 100%;
  background: rgba(18, 22, 38, 0.95);
  padding: 15px 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
`;

export const Logo = styled.div`
  font-size: 22px;
  font-weight: 700;
  color: #f2f4f7;
  display: flex;
  align-items: center;
  
  span {
    color: #3498db;
    margin-left: 5px;
  }
`;

export const NavLinks = styled.div`
  display: flex;
  gap: 25px;
`;

export const NavLink = styled.a`
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  transition: color 0.2s;
  cursor: pointer;
  
  &:hover {
    color: #3498db;
  }
  
  &.active {
    color: #3498db;
    font-weight: 600;
  }
`;

export const FooterContainer = styled.footer`
  width: 100%;
  background: rgba(18, 22, 38, 0.95);
  padding: 25px;
  margin-top: auto;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

export const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  max-width: 1200px;
  margin: 0 auto;
`;

export const FooterLinks = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 15px;
`;

export const FooterLink = styled.a`
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s;
  cursor: pointer;
  
  &:hover {
    color: #3498db;
  }
`;

export const Copyright = styled.p`
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
  text-align: center;
`;

export const NavbarComponent = ({ activePage, handleNavClick, handleLogout }) => {
    return (
      <Navbar>
        <Logo>
          IoT<span>Dashboard</span>
        </Logo>
        <NavLinks>
          <NavLink 
            className={activePage === 'dashboard' ? 'active' : ''} 
            onClick={() => handleNavClick('dashboard')}
          >
            Dashboard
          </NavLink>
        <NavLink 
          className={activePage === 'devices' ? 'active' : ''} 
          onClick={() => handleNavClick('devices')}
        >
          Devices
        </NavLink>
        <NavLink 
          className={activePage === 'analytics' ? 'active' : ''} 
          onClick={() => handleNavClick('analytics')}
        >
          Analytics
        </NavLink>
        <NavLink 
          className={activePage === 'alerts' ? 'active' : ''} 
          onClick={() => handleNavClick('alerts')}
        >
          Alerts
        </NavLink>
        <NavLink 
          className={activePage === 'overview' ? 'active' : ''} 
          onClick={() => handleNavClick('overview')}
        >
          Overview
        </NavLink>
        <NavLink 
          className={activePage === 'settings' ? 'active' : ''} 
          onClick={() => handleNavClick('settings')}
        >
          Settings
        </NavLink>
      </NavLinks>
      <button 
        onClick={handleLogout} 
        style={{ 
          background: "rgba(231, 76, 60, 0.2)", 
          color: "#e74c3c", 
          border: "1px solid rgba(231, 76, 60, 0.3)", 
          borderRadius: "6px", 
          padding: "8px 15px", 
          cursor: "pointer",
          transition: "all 0.2s",
          fontWeight: "500"
        }}
        onMouseOver={(e) => {
          e.target.style.background = "rgba(231, 76, 60, 0.3)";
        }}
        onMouseOut={(e) => {
          e.target.style.background = "rgba(231, 76, 60, 0.2)";
        }}
      >
        Logout
      </button>
    </Navbar>
  );
}

NavbarComponent.propTypes = {
  activePage: PropTypes.string.isRequired,
  handleNavClick: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired
};

export const FooterComponent = () => {
    return (
      <FooterContainer>
        <FooterContent>
          <FooterLinks>
            <FooterLink>About</FooterLink>
          <FooterLink>Documentation</FooterLink>
          <FooterLink>API</FooterLink>
          <FooterLink>Support</FooterLink>
          <FooterLink>Privacy Policy</FooterLink>
          </FooterLinks>
        <Copyright>© {new Date().getFullYear()} IoT Dashboard</Copyright>
      </FooterContent>
    </FooterContainer>
  );
};