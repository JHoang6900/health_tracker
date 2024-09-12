import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('userId'));

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem('userId')); 
  }, [localStorage.getItem('userId')]); 

  if (isAuthenticated) {
    return children; 
  } else {
    return <Navigate to="/login" replace />;
  }
}

export default ProtectedRoute;