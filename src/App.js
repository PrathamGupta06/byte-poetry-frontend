import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Logout from './components/Logout';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<PrivateRoute component={<Dashboard />} />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}
export default App; 