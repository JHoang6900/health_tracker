import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegistrationForm from "./components/RegistrationForm.jsx";
import VitalsForm from "./components/VitalsForm"; // Import your VitalsForm component
import LoginForm from "./components/LoginForm.jsx"; // Import your LoginForm component
import PatientList from "./components/PatientList"; // Import your PatientList component

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/" element={<VitalsForm />} /> {/* Render VitalsForm at the root path */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/patients" element={<PatientList />} />
        {/* ... other routes go here */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
