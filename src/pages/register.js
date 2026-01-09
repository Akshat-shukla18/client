import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const trimmedEmail = email.trim().toLowerCase(); // Normalize email
    const trimmedPassword = password.trim();

    // Basic validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setMessage('Invalid email format');
      return;
    }
    if (trimmedPassword.length < 6) {
      setMessage('Password must be at least 6 characters');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        email: trimmedEmail,
        password: trimmedPassword,
      });
      setMessage('Registration successful. You can now login.');
      console.log('Registration response:', res.data);
      navigate('/login');
    } catch (err) {
      console.error('Registration error:', err.response?.data, err.message);
      setMessage(
        err.response?.data?.message || 'Registration failed. Try a different email.'
      );
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Password (min 6 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Register</button>
      </form>
      <p>
        If already have acc. <Link to="/login">login here.</Link>
      </p>
      {message && (
        <p className={`message ${message.includes('successful') ? 'success' : 'error'}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default Register;
