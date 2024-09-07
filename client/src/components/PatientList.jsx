import { useState, useEffect } from "react";
import axios from "axios";

function PatientList() {
  const [patientsData, setPatientsData] = useState([]);
  const [shouldFetchData, setShouldFetchData] = useState(true); // Flag variable

  const [latestVitalsData, setLatestVitalsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const patientsResponse = await axios.get(
          "http://localhost:8080/patients"
        );
        console.log("All patients received successfully.", patientsResponse);
        setPatientsData(patientsResponse.data);

        const latestVitalsResponse = await axios.get(
          "http://localhost:8080/vitals/latest"
        );
        console.log(
          "Latest vitals received successfully.",
          latestVitalsResponse
        );
        setLatestVitalsData(latestVitalsResponse.data);

        setShouldFetchData(false); // Only fetch data once
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (shouldFetchData) {
      fetchData();
    }

    console.log("patientsData ~>", patientsData);
    console.log("latestVitalsData ~>", latestVitalsData);
  }, [shouldFetchData, latestVitalsData, patientsData]);

  return (
    <div
      id="outerDivCentering"
      className="flex items-center justify-center h-screen"
    >
      {/* INSERT EXAMPLE PATIENT CODE HERE */}

      <div className="flex flex-col items-center justify-center w-full p-6">
        {/* Card container */}
        {patientsData.map((patient) => (
          <div
            key={patient.patient_id}
            className="w-full p-6 my-2 border border-white shadow-md rounded-3xl md:w-1/4"
          >
            <h2 className="mb-2 text-2xl font-semibold text-white">
              {patient.name}
              <span className="text-gray-500">| 0{patient.patient_id}</span>
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}
export default PatientList;

// ----------------------------------------------------------------
// EXAMPLE PATIENT CODE
// ----------------------------------------------------------------
<div
  id="patientCard"
  className="w-full p-6 border border-white shadow-md rounded-3xl md:w-1/4"
>
  {" "}
  {/* Card container */}
  <h1 className="mb-2 text-2xl font-semibold text-white">
    Alice Johnson <span className="text-gray-500">| ID 03</span>
  </h1>
  <div className="text-gray-400">
    <p className="mb-1">
      <span className="font-medium text-green-400">Last Recorded:</span>{" "}
      2024-08-10 09:30:00 {/* text-green-400 if recent | text-red-400 if old */}
    </p>
    <p className="mb-1">
      <span className="font-medium">Blood Pressure:</span> 110/70
    </p>
    <p className="mb-1">
      <span className="font-medium">Pulse:</span> 65 bpm
    </p>
    <p className="mb-1">
      <span className="font-medium">Oxygen:</span> 98%
    </p>
    <p className="mb-1">
      <span className="font-medium">Temperature:</span> 97.8°F
    </p>
    <p>
      <span className="font-medium">Respiration:</span> 14 bpm
    </p>
  </div>
</div>;
