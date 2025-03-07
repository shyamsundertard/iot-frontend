import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

// Styled Components
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #1e3c72, #2a5298);
  color: #f2f4f7;
`;

const Form = styled.div`
  background: rgba(255, 255, 255, 0.15);
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  text-align: center;
  backdrop-filter: blur(12px);
  width: 350px;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 26px;
  font-weight: bold;
  color: #fff;
  letter-spacing: 1px;
`;

const InputContainer = styled.div`
  position: relative;
  margin: 15px 0;
  width: 100%;
`;

const Icon = styled.span`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.8);
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 45px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  outline: none;
  transition: all 0.3s ease-in-out;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  &:focus {
    background: rgba(255, 255, 255, 0.3);
    border: 2px solid #4fa3d1;
  }
`;

const TogglePassword = styled.span`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: rgba(255, 255, 255, 0.8);
  transition: color 0.3s;

  &:hover {
    color: #fff;
  }
`;

const Button = styled.button`
  background: linear-gradient(45deg, #4fa3d1, #1e88e5);
  color: white;
  padding: 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  margin-top: 20px;
  font-size: 16px;
  font-weight: bold;
  transition: all 0.3s ease-in-out;

  &:hover {
    background: linear-gradient(45deg, #1e88e5, #4fa3d1);
    transform: scale(1.05);
  }
`;

const ErrorMessage = styled.p`
  color: #ff4d4d;
  margin-top: 10px;
  font-size: 14px;
`;

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = () => {
    if (username === "tardshyamsunder" && password === "iotpassword") {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/");
    } else {
      setError("Incorrect username or password");
    }
  };

  return (
    <Container>
      <Form>
        <Title>Login</Title>
        <InputContainer>
          <Icon><FaUser /></Icon>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </InputContainer>
        <InputContainer>
          <Icon><FaLock /></Icon>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TogglePassword onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </TogglePassword>
        </InputContainer>
        <Button onClick={handleLogin}>Login</Button>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Form>
    </Container>
  );
}

export default LoginPage;
