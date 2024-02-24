import React from 'react';
import { Link } from 'react-router-dom'; 

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to B.Y.T.E. Poetry</h1>
      <p>A platform for sharing and discovering poems.</p>
      <nav>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/logout">Logout</Link>
      </nav>
    </div>
  );
}

export default Home;