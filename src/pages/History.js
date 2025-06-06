import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { useAuth } from '../context/AuthContext';

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get('/api/history', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setHistory(res.data.history || []);
      } catch (err) {
        setHistory([]);
      }
      setLoading(false);
    };
    fetchHistory();
  }, [token]);

  return (
    <div style={{padding: '30px'}}>
      <h2>Analysis History</h2>
      {loading ? (
        <p>Loading...</p>
      ) : history.length === 0 ? (
        <p>No uploads yet.</p>
      ) : (
        <ul>
          {history.map((item, idx) => (
            <li key={item._id || idx} style={{marginBottom: 30}}>
              <b>File:</b> {item.filename} <br />
              <b>Date:</b> {new Date(item.createdAt).toLocaleString()} <br />
              {item.analysis && item.analysis.labels && item.analysis.values && (
                <div style={{maxWidth: 400}}>
                  <Bar data={{
                    labels: item.analysis.labels,
                    datasets: [{
                      label: 'Values',
                      data: item.analysis.values,
                      backgroundColor: 'rgba(75,192,192,0.6)'
                    }]
                  }} />
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default History;
