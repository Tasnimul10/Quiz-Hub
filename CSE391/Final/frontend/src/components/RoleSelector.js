import React from 'react';
import { useNavigate } from 'react-router-dom';

const RoleSelector = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Quiz Platform</h1>
      <p>Select your role:</p>
      <button onClick={() => navigate('/student')} style={{ margin: '10px', padding: '10px' }}>Student</button>
      <button onClick={() => navigate('/teacher')} style={{ margin: '10px', padding: '10px' }}>Teacher</button>
      <button onClick={() => navigate('/admin')} style={{ margin: '10px', padding: '10px' }}>Admin</button>
    </div>
  );
};

export default RoleSelector;

