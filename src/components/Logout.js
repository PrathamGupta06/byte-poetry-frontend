import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

const Logout = () => {
  if (isAuthenticated()) {
    localStorage.clear();
  }
  return <Navigate to="/login" />;
};

export default Logout;