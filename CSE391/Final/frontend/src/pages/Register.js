import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = ({ role }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(email, password, role, name);
      navigate(`/${role}`);
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <div style={{ padding: '50px', maxWidth: '400px', margin: 'auto' }}>
      <h2>{role.charAt(0).toUpperCase() + role.slice(1)} Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required style={{ width: '100%', margin: '10px 0', padding: '10px' }} />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required style={{ width: '100%', margin: '10px 0', padding: '10px' }} />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required style={{ width: '100%', margin: '10px 0', padding: '10px' }} />
        <button type="submit" style={{ width: '100%', padding: '10px' }}>Register</button>
      </form>
    </div>
  );
};

export default Register;

