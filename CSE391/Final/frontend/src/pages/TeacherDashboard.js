import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const TeacherDashboard = () => {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState({});

  useEffect(() => {
    axios.get('/api/dashboard/teacher').then(res => setStats(res.data));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Teacher Dashboard - {user.name}</h1>
      <button onClick={logout}>Logout</button>
      <p>Total Attempts: {stats.totalAttempts}</p>
      <p>Earnings: ${stats.earnings}</p>
      <h3>Your Quizzes</h3>
      {/* List quizzes */}
    </div>
  );
};

export default TeacherDashboard;

