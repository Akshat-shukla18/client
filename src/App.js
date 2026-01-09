import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import Dashboard from './pages/Dashboard';
import Upload from './pages/upload';
import Navbar from './components/Navbar'; 
import ProtectedRoute from './components/ProtectedRoute';
import DataTable from './pages/DataTable';
import './App.css';

// Define routes as an array for Navbar and Routes
const appRoutes = [
  { path: '/login', element: <Login />, label: 'Login', public: true },
  { path: '/register', element: <Register />, label: 'Register', public: true },
  { path: '/dashboard', element: <Dashboard />, label: 'Dashboard', protected: true },
  { path: '/upload', element: <Upload />, label: 'Upload', public: true },
  { path: '/data', element: <DataTable />, label: 'View Data', protected: true },
];

function App() {
  return (
    <Router>
      <Navbar routes={appRoutes} />
      <Routes>
        {appRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              route.protected ? (
                <ProtectedRoute>{route.element}</ProtectedRoute>
              ) : (
                route.element
              )
            }
          />
        ))}
        {/* Default to login */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;