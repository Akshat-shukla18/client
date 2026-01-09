import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataChart from '../components/DataChart';
import './DataTable.css';

const Dashboard = () => {
  const [rows, setRows] = useState([]);
  const [labels, setLabels] = useState([]);
  const [values, setValues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [aiAnalysis, setAiAnalysis] = useState('');
  const [analyzing, setAnalyzing] = useState(false);

  useEffect(() => {
    console.log('DataTable mounted, fetching data...');
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/upload/all');
        console.log('Data fetched:', res.data.length, 'rows');
        // Calculate unique rows count based on JSON stringification
        const uniqueRows = new Set(res.data.map(row => JSON.stringify(row)));
        console.log('Unique rows count:', uniqueRows.size);
        setRows(res.data);

        // Process data for chart
        if (Array.isArray(res.data)) {
          const names = res.data.map(row => row.NAME || 'Unnamed');
          const results = res.data.map(row => parseFloat(row.RESULT) || 0);
          setLabels(names);
          setValues(results);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Set up real-time updates every 500ms for more dynamic feel
    const interval = setInterval(fetchData, 500);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []); // 👈 runs once on component mount

  const handleAiAnalysis = async () => {
    setAnalyzing(true);
    try {
      const res = await axios.post('http://localhost:5000/api/ai/analyze');
      setAiAnalysis(res.data.analysis);
    } catch (error) {
      console.error('Error analyzing data:', error);
      setAiAnalysis('Error analyzing data. Please try again.');
    } finally {
      setAnalyzing(false);
    }
  };

  console.log('Rendering DataTable with rows:', rows.length);

  return (
    <div className="data-table-container">
      <h2>Uploaded Excel Data</h2>

      {rows.length === 0 ? (
        <p className="no-data-message">No data found.</p>
      ) : (
        <>
          <button onClick={handleAiAnalysis} disabled={analyzing} className="ai-analyze-btn">
            {analyzing ? 'Analyzing...' : 'Analyze with AI'}
          </button>
          <table className="data-table">
            <thead>
              <tr>
                {/* Safe check for Object.keys */}
                {rows[0] &&
                  Object.keys(rows[0])
                    .filter((key) => key !== '_id')
                    .map((key) => <th key={key}>{key}</th>)}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => (
                <tr key={idx}>
                  {Object.entries(row)
                    .filter(([key]) => key !== '_id')
                    .map(([key, val]) => (
                      <td key={key}>
                        {typeof val === 'object' ? JSON.stringify(val) : val}
                      </td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="chart-container">
            <h3>Data Visualization</h3>
            {loading ? <p>Loading chart...</p> : <DataChart labels={labels} values={values} />}
          </div>
          {aiAnalysis && (
            <div className="ai-analysis-container">
              <h3>AI Analysis</h3>
              <p>{aiAnalysis}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
