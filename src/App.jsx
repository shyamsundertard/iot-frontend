import styled from "styled-components";
import Dashboard from "./pages/dashboard";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/login";
import PageNotFound from "./components/PageNotFound";
import PropTypes from 'prop-types';

// Main container
const Container = styled.div`
  width: 100%;
  margin: 0;
  padding: 0;
  font-family: "Inter", sans-serif;
  background: linear-gradient(to bottom, #1a1f36, #121626);
  height: auto;
  min-height: 100vh;
  color: #f2f4f7;
  display: flex;
  flex-direction: column;
`;

function App() {

  const PrivateRoute = ({ children }) => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    return isLoggedIn ? children : <Navigate to="/login" />;
  };

  PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired
  };

  return (
    <Container>
      <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
    </Container>
  );
}

export default App;