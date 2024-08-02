// components/ProtectedRoute.js
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children, redirectTo }) => {
  const jwtToken = Cookies.get('jwt_token');
  return jwtToken ? children : <Navigate to={redirectTo} />;
};

export default ProtectedRoute;
