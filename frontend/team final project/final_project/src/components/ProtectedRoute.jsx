import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const user = localStorage.getItem('sqlapp_current_user');
  return user ? children : <Navigate to="/login" replace />;
}
