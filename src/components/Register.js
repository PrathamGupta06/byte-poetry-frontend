import React, { useState, useEffect } from 'react';
import axios from 'axios'; // or another library for API requests

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await axios.post('http://panel.mait.ac.in:8001/auth/register/', {
        name,
        email,
        password,
      });

      if (response.data.success) {
        // display success message and redirect to login
      } else {
        setError(response.data.message || 'Registration failed');
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
