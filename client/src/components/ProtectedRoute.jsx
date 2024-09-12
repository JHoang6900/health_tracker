import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const isAuthenticated = !!localStorage.getItem('userId');

  if (isAuthenticated) {
    console.log('isAuthenticated TRUE ~>', isAuthenticated);
    return children; // Render the protected component (PatientList or PatientDetails)
  } else {
    console.log('isAuthenticated FALSE ~>', isAuthenticated);
    return <Navigate to="/login" replace />; // Redirect to login if not authenticated
  }
}

export default ProtectedRoute;