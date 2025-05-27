import React, { useState } from 'react';
import axios from 'axios';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage('');
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
      // You can also handle the response data here (e.g., show a preview)
    } catch (err) {
      setMessage(
        err.response?.data?.message || 'File upload failed. Please try again.'
      );
    }
    setUploading(false);
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
        <div style={{ marginTop: 20, color: message.includes('success') ? 'green' : 'red' }}>
          {message}
        </div>
      )}
    </div>
  );
};

export default Upload;
