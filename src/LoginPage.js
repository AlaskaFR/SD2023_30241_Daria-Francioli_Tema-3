import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; 
import { useDispatch } from 'react-redux';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const loginUser = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:8081/users/login', {
        email,
        password,
      });
      // Assuming the backend sends the token in the response body
      const { token, role } = response.data;
      localStorage.setItem('token', token); // Save the token
      onLogin({ email, role }); // Update the login state
      return { role };
    } catch (error) {
      console.error('Login failed:', error);
      return null;
    }
  };  

  const handleSubmit = async (event) => {
    event.preventDefault();
    const loginResponse = await loginUser(email, password);
    if (loginResponse) {
      const { role } = loginResponse;
      if (role=== 1) {
        navigate('/admin');
        } else if (role === 0) {
        navigate('/user');
        }
        }
        };
        
        return (
        <div className="login-container">
        <h2>Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
        <div className="input-group">
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="input-group">
        <label>Password:</label>
        <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        />
        </div>
        <button type="submit" className="login-btn">
        Login
        </button>
        </form>
        </div>
        );
        };
        
        export default LoginPage;
