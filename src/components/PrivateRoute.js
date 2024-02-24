import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

const PrivateRoute = ({ component }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  return component;
};

export default PrivateRoute;