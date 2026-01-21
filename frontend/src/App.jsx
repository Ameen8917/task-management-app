// frontend/src/App.jsx
import { useState, useEffect } from 'react';
import API from './api/axios';

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
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Task Management App</h1>
        <p className="text-lg text-gray-600 mt-2">Phase 1.1 - Setup Complete ✅</p>
      </header>

      <main className="w-full max-w-md bg-white rounded-xl shadow-md p-6">
        <section className="mb-4">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Server Health Check</h2>

          {loading && <p className="text-blue-500">Checking server...</p>}
          {error && <p className="text-red-500">Error: {error}</p>}
          {health && (
            <div className="bg-green-50 p-4 rounded-md border border-green-200">
              <p className="text-green-700 font-medium">✅ {health.message}</p>
              <p className="text-gray-600 mt-1">Environment: {health.environment}</p>
              <p className="text-gray-600 mt-1">
                Timestamp: {new Date(health.timestamp).toLocaleString()}
              </p>
            </div>
          )}
        </section>

        <button
          onClick={checkHealth}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors"
        >
          Refresh Health Check
        </button>
      </main>
    </div>
  );
}

export default App;
