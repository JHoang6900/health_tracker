import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function PatientDetails() {
  const { id } = useParams(); // Get the patient ID from the URL
  const [patientVitals, setPatientVitals] = useState([]);

  const [formData, setFormData] = useState({
    patient_id: 1, // might need to handle patient selection differently
    user_id: 4, // might need to handle user authentication and get the ID
    datetime: "",
    blood_pressure: "",
    pulse: "",
    oxygen: "",
    temperature: "",
    respiration: "",
  });

  const handleInputChange = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;
    const newFormData = { ...formData };

    newFormData[inputName] = inputValue;
    setFormData(newFormData);

    console.log("newFormData ~>", newFormData);
  };

  // const patientName = patientVitals[0].patient_name

  const postVitals = () => {
    axios
      .post("http://localhost:8080/vitals", {
        ...formData,
        patient_id: { id },
        user_id: 4,
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error("Error posting vitals:", error);
      });
  };

  useEffect(() => {
    const getVitals = async () => {
      axios.get(`http://localhost:8080/vitals/${id}`).then((response) => {
        const vitalData = response.data;
        setPatientVitals(vitalData);
        console.log("YOU DID IT! ~>", vitalData);
      });
    };

    getVitals();
  }, [id]);

  return (
    <div
      id="outerDivCentering"
      className="flex flex-col items-center justify-center mt-4"
    >
      <div className="flex w-full border border-white rounded-3xl md:w-1/4">
        <div className="flex items-center justify-center w-full">
          <div
            id="inputFields"
            className="flex flex-col items-center justify-center text-2xl text-black"
          >
                        {patientVitals.length > 0 ? ( // Conditionally render the label with patient name
              <label className="mt-8 text-white" htmlFor="bloodPressure">
                New Vital for {patientVitals[0].patient_name}
              </label>
            ) : (
              <label className="mt-8 text-white" htmlFor="bloodPressure">
                {/* empty place for before data fetches (when patietn name is empty) */}
              </label>
            )}

            <label className="mt-8 text-white" htmlFor="bloodPressure">
              Date + Time:
            </label>
            <input
              type="datetime-local"
              id="datetime"
              name="datetime"
              onChange={handleInputChange}
              className="my-2 text-black"
            />

            <label className="text-white" htmlFor="bloodPressure">
              Blood Pressure:
            </label>

            <div id="systolicDiastolic" className="flex items-center">
              <input
                type="number"
                inputMode="numeric"
                id="bloodPressure"
                name="blood_pressure"
                onChange={handleInputChange}
                pattern="[0-9]{2,3}"
                placeholder="SYS"
                max="999"
                min="0"
                className="w-16"
              />
              <span className="mx-3 text-3xl font-bold text-white">/</span>
              <input
                type="number"
                inputMode="numeric"
                id="bloodPressure"
                name="blood_pressure"
                onChange={handleInputChange}
                pattern="[0-9]{2,3}"
                placeholder="DIA"
                max="999"
                min="0"
                className="w-16"
              />
            </div>

            <label className="text-white" htmlFor="Pulse">
              Pulse (bpm):
            </label>
            <input
              type="number"
              inputMode="numeric"
              id="Pulse"
              name="pulse"
              onChange={handleInputChange}
              placeholder="57bpm"
              className="my-2"
            />

            <label className="text-white" htmlFor="Oxygen">
              Oxygen %:
            </label>
            <input
              type="number"
              inputMode="numeric"
              id="Oxygen"
              name="oxygen"
              onChange={handleInputChange}
              placeholder="94%"
              className="my-2"
            />

            <label className="text-white" htmlFor="Temperature">
              Temperature:
            </label>
            <div className="flex items-center my-2">
              <input
                type="number"
                inputMode="decimal"
                id="Temperature"
                name="temperature"
                onChange={handleInputChange}
                placeholder="98.6°F"
              />
            </div>
            <label className="text-white" htmlFor="Respiration">
              Respiration (bpm):
            </label>
            <input
              type="number"
              inputMode="numeric"
              id="Respiration"
              name="respiration"
              onChange={handleInputChange}
              placeholder="18bpm"
              className="my-2"
            />

            <button
              type="button"
              className="text-xl text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg  px-5 py-2.5 text-center me-2 mb-2"
              onClick={postVitals}
            >
              Submit
            </button>
          </div>
        </div>
      </div>




      <h2 className="mt-4 text-white underline">Past Vitals</h2>
{patientVitals.length > 0 ? (
  <table className="text-white table-auto"> {/* Add table-auto for better column sizing and w-full for full width */}
    <thead>
      <tr>
        <th className="px-4 py-2">Date/Time</th> 
        <th className="px-4 py-2 text-center">Blood Pressure</th>  {/* Center the header text */}
        <th className="px-4 py-2">Pulse</th> 
        <th className="px-4 py-2">Oxygen</th> 
        <th className="px-4 py-2 text-center">Temperature</th>  {/* Center the header text */}
        <th className="px-4 py-2 text-center">Respiration</th> {/* Center the header text */}
      </tr>
    </thead>
    <tbody>
      {patientVitals.map((vital) => (
        <tr key={vital.vital_id}>
          <td className="px-4 py-2 border">{vital.datetime}</td>
          <td className="px-4 py-2 text-center border">{vital.blood_pressure}</td> {/* Center the cell content */}
          <td className="px-4 py-2 border">{vital.pulse}</td>
          <td className="px-4 py-2 border">{vital.oxygen}</td>
          <td className="px-4 py-2 text-center border">{vital.temperature}</td> {/* Center the cell content */}
          <td className="px-4 py-2 text-center border">{vital.respiration}</td> {/* Center the cell content */}
        </tr>
      ))}
    </tbody>
  </table>
) : (
  <p className="text-white">No vitals recorded yet.</p>
)}
 
    </div>
  );
}
export default PatientDetails;
