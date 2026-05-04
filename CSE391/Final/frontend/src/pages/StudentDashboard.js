import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/dashboard/student').then(res => {
      setStats(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const data = {
    labels: ['Average', 'Best'],
    datasets: [{
      label: 'Score %',
      data: [stats.avgScore, stats.bestScore],
      backgroundColor: 'rgba(75,192,192,0.6)',
    }]
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Student Dashboard - {user.name}</h1>
      <button onClick={logout}>Logout</button>
      <div style={{ display: 'flex' }}>
        <div>
          <p>Total Quizzes: {stats.totalQuizzes}</p>
          <p>Average Score: {stats.avgScore?.toFixed(1)}%</p>
          <p>Best Score: {stats.bestScore}%</p>
        </div>
        <Bar data={data} />
      </div>
    </div>
  );
};

export default StudentDashboard;

