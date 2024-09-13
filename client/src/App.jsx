import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegistrationForm from "./components/RegistrationForm.jsx";
import LoginForm from './components/LoginForm';
import PatientList from './components/PatientList';
import PatientDetails from './components/PatientDetails';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar.jsx';

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />
       

        {/* Protected Routes */}
        <Route path="/patients" element={<ProtectedRoute><PatientList /></ProtectedRoute>} />
        <Route path="/patient/:id" element={<ProtectedRoute><PatientDetails /></ProtectedRoute>} /> 

        {/* ... other routes */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
