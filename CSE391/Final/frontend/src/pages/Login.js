import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const Login = ({ role }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || `/${role}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password, role);
      navigate(from, { replace: true });
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div style={{ padding: '50px', maxWidth: '400px', margin: 'auto' }}>
      <h2>{role.charAt(0).toUpperCase() + role.slice(1)} Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required style={{ width: '100%', margin: '10px 0', padding: '10px' }} />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required style={{ width: '100%', margin: '10px 0', padding: '10px' }} />
        <button type="submit" style={{ width: '100%', padding: '10px' }}>Login</button>
      </form>
      <p style={{ textAlign: 'center' }}>
        No account? <a href={`/${role}/register`}>Register</a>
      </p>
    </div>
  );
};

export default Login;

