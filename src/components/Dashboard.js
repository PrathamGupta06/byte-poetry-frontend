import React, { useState, useEffect } from 'react';
import PoemCard from './Poemcard';
import axios from 'axios';

function Dashboard() {
  const accessToken = localStorage.getItem('accessToken');
  const [userDetails, setUserDetails] = useState(null);
  const [poems, setPoems] = useState([]);
  const [error, setError] = useState(null);
  const [newPoem, setNewPoem] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const header = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    }
  };
  // Fetch user details and poems after login
  useEffect(() => {
    const header = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      }
    };
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get('http://panel.mait.ac.in:8001/auth/user-details/', header);
        setUserDetails(response.data);
      } catch (error) {
        console.error(error);
        setError('Failed to fetch user details');
      }
    };
    
    const fetchPoems = async () => {
      try {
        const response = await axios.get('http://panel.mait.ac.in:8001/poem/get/', header);
        setPoems(response.data);
      } catch (error) {
        console.error(error);
        setError('Failed to fetch poems');
      }
    };

    fetchUserDetails();
    fetchPoems();
  }, [poems]);

  const handlePoemSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await axios.post('http://panel.mait.ac.in:8001/poem/create/', {
        poem: newPoem,
        author: newAuthor,
      }, header);

      if (response.data.success) {
        setPoems([...poems, response.data.poem]); // Add new poem to the list
        setNewPoem('');
      } else {
        setError(response.data.message || 'Failed to create poem');
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      {userDetails && (
        <div className="user-details">
        <h2>User Details</h2>
        <p>Email: {userDetails.email}</p>
        <p>Name: {userDetails.name}</p>
        <p>Role: {userDetails.role}</p>
        </div>
      )}
      {poems.length > 0 ? (
        <div className="poems">
          <h2>Your Poems</h2>
          {poems.map((poem) => (
            <PoemCard key={poem.id} {...poem} />
          ))}
        </div>
      ) : (
        <p>You don't have any poems yet.</p>
      )}
      <form onSubmit={handlePoemSubmit}>
        <label htmlFor="newPoem">Write your poem:</label>
        <textarea
          id="newPoem"
          value={newPoem}
          onChange={(e) => setNewPoem(e.target.value)}
        />
        <label htmlFor="author">Author:</label>
        <input
          type="text"
          id="author"
          onChange = {(e) => setNewAuthor(e.target.value)}
        />
        <button type="submit">Submit Poem</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default Dashboard;