// frontend/src/App.jsx
import { useState, useEffect } from 'react';
import API from './api/axios';
import './App.css';

function App() {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkHealth();
  }, []);

  const checkHealth = async () => {
    try {
      setLoading(true);
      const response = await API.get('/health');
      setHealth(response.data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Something went wrong');
      setHealth(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>Task Management App</h1>
        <p>Phase 1.1 - Setup Complete ✅</p>
      </header>

      <main>
        <section className="health-check">
          <h2>Server Health Check</h2>

          {loading && <p>Checking server...</p>}
          {error && <p className="error">Error: {error}</p>}
          {health && (
            <div className="health-info">
              <p>✅ {health.message}</p>
              <p>Environment: {health.environment}</p>
              <p>Timestamp: {new Date(health.timestamp).toLocaleString()}</p>
            </div>
          )}

          <button onClick={checkHealth}>Refresh Health Check</button>
        </section>
      </main>
    </div>
  );
}

export default App;
