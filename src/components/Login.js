import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await axios.post('http://panel.mait.ac.in:8001/auth/login/', {
        email,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem('accessToken', response.data.access);
        localStorage.setItem('refreshToken', response.data.refresh);
        navigate('/dashboard'); 
        
      }
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
