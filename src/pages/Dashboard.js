import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataChart from '../components/DataChart';

const Dashboard = () => {
  const [labels, setLabels] = useState([]);
  const [values, setValues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExcelData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/upload/all');
        const data = res.data;

        console.log("📦 Fetched Excel Data:", data);

        if (Array.isArray(data)) {
          const names = data.map(row => row.NAME || 'Unnamed');
          const results = data.map(row => parseFloat(row.RESULT) || 0);

          setLabels(names);
          setValues(results);
        }
      } catch (error) {
        console.error("❌ Failed to load data from Excel upload:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExcelData();
  }, []);

  return (
    <div className="dashboard-container">
      <h2>📊 WELCOME TO YOUR DASHBOARD</h2>
      <p>You are logged in.</p>
      {loading ? <p>Loading chart...</p> : <DataChart labels={labels} values={values} />}
    </div>
  );
};

export default Dashboard;
