import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DataTable.css';

const Dashboard = () => {
  const [rows, setRows] = useState([]);

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
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []); // 👈 runs once on component mount

  console.log('Rendering DataTable with rows:', rows.length);

  return (
    <div className="data-table-container">
      <h2>Uploaded Excel Data</h2>

      {rows.length === 0 ? (
        <p className="no-data-message">No data found.</p>
      ) : (
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
      )}
    </div>
  );
};

export default Dashboard;
