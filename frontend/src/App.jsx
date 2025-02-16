import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/stats')
      .then(response => setStats(response.data))
      .catch(err => setError(err.message));
  }, []);

  return (
    <div>
      <h1>System Vitals</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {stats ? (
        <ul>
          <li>CPU: {stats.cpu}%</li>
          <li>Memory: {stats.memory}%</li>
          <li>Disk: {stats.disk}%</li>
          <li>Processes: {stats.process_count}</li>
          <li>Network Sent: {stats.network.bytes_sent} bytes</li>
          <li>Network Received: {stats.network.bytes_recv} bytes</li>
        </ul>
      ) : (
        <p>Loading system stats...</p>
      )}
    </div>
  );
}

export default App;