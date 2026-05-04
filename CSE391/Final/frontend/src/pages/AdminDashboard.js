import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState({});

  useEffect(() => {
    axios.get('/api/dashboard/admin').then(res => setStats(res.data));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Admin Dashboard</h1>
      <button onClick={logout}>Logout</button>
      <p>Total Users: {stats.users?.length}</p>
      <p>Total Quizzes: {stats.totalQuizzes}</p>
      <p>Total Scores: {stats.totalScores}</p>
      {/* Users list */}
    </div>
  );
};

export default AdminDashboard;

