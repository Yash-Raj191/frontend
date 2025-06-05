import React, { useState } from 'react';
import axios from 'axios';
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const Upload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage('');
    setAnalysis(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    if (!file) {
      setMessage('Please select an Excel file to upload.');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);

    setUploading(true);
    try {
      // Adjust the URL if your backend endpoint is different
      const res = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('File uploaded successfully!');
      setAnalysis(res.data.analysis); // Expect backend to return analysis
    } catch (err) {
      setMessage(
        err.response?.data?.message || 'File upload failed. Please try again.'
      );
      setAnalysis(null);
    }
    setUploading(false);
  };

  // Helper to render charts if analysis is present
  const renderCharts = () => {
    if (!analysis) return null;
    // Example: analysis = { labels: [], values: [] }
    const chartData = {
      labels: analysis.labels,
      datasets: [
        {
          label: 'Values',
          data: analysis.values,
          backgroundColor: 'rgba(75,192,192,0.6)',
        },
      ],
    };
    return (
      <div style={{ marginTop: 30 }}>
        <h3>Bar Chart</h3>
        <Bar data={chartData} />
        <h3>Line Chart</h3>
        <Line data={chartData} />
        <h3>Pie Chart</h3>
        <Pie
          data={{
            labels: analysis.labels,
            datasets: [
              {
                data: analysis.values,
                backgroundColor: [
                  '#FF6384',
                  '#36A2EB',
                  '#FFCE56',
                  '#4BC0C0',
                  '#9966FF',
                  '#FF9F40',
                ],
              },
            ],
          }}
        />
      </div>
    );
  };

  return (
    <div style={{ padding: '30px' }}>
      <h2>Upload Excel File</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept=".xls,.xlsx"
          onChange={handleFileChange}
        />
        <button type="submit" disabled={uploading} style={{ marginLeft: 10 }}>
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
      {message && (
        <div
          style={{
            marginTop: 20,
            color: message.includes('success') ? 'green' : 'red',
          }}
        >
          {message}
        </div>
      )}
      {renderCharts()}
    </div>
  );
};

export default Upload;
