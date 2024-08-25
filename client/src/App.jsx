import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegistrationForm from "./components/RegistrationForm.jsx";
import VitalsForm from "./components/VitalsForm"; // Import your VitalsForm component

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/" element={<VitalsForm />} /> {/* Render VitalsForm at the root path */}
        {/* ... other routes go here */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
