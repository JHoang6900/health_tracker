import axios from "axios";
import { useState } from "react";

function App() {

  const [formData, setFormData] = useState({
    patient_id: 1, // might need to handle patient selection differently
    user_id: 4,    // might need to handle user authentication and get the ID
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
    const newFormData = { ...formData};
    
    newFormData[inputName] = inputValue; 
    setFormData(newFormData);

    console.log('newFormData ~>',newFormData);
  };
  


  const postVitals = () => {
    axios
      .post("http://localhost:8080/vitals", {...formData, patient_id: 1, user_id: 4})
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error("Error posting vitals:", error);
      });
  };


  return (
    <div id="outerDivCentering" className="flex items-center justify-center h-screen">

      

    <div className="flex w-full border border-white rounded-3xl md:w-1/4">
    
    
          <div className="flex items-center justify-center w-full">
          <div id="inputFields" className="flex flex-col items-center justify-center text-2xl text-black">
    
    
          <label className="mt-8 text-white" htmlFor="bloodPressure">Date + Time:</label>
          <input type="datetime-local" id="datetime" name="datetime" onChange={handleInputChange} className="my-2 text-black" />
    
          <label className="text-white" htmlFor="bloodPressure">Blood Pressure:</label>

    <div id="systolicDiastolic" className="flex items-center">
          <input type="number" inputMode="numeric" id="bloodPressure" name="blood_pressure" onChange={handleInputChange} pattern="[0-9]{2,3}" placeholder="SYS" max="999" min="0"  className="w-16" />
          <span className="mx-3 text-3xl font-bold text-white">/</span>
          <input type="number" inputMode="numeric" id="bloodPressure" name="blood_pressure" onChange={handleInputChange} pattern="[0-9]{2,3}" placeholder="DIA" max="999" min="0" className="w-16" />
    </div>
    
          <label className="text-white" htmlFor="Pulse">Pulse (bpm):</label>
          <input type="number" inputMode="numeric" id="Pulse" name="pulse" onChange={handleInputChange} placeholder="57bpm" className="my-2" /> 
    
          <label className="text-white" htmlFor="Oxygen">Oxygen %:</label>
          <input type="number" inputMode="numeric" id="Oxygen" name="oxygen" onChange={handleInputChange} placeholder="94%" className="my-2" /> 
    
          <label className="text-white" htmlFor="Temperature">Temperature:</label>
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
          <label className="text-white" htmlFor="Respiration">Respiration (bpm):</label>
          <input type="number" inputMode="numeric" id="Respiration" name="respiration" onChange={handleInputChange} placeholder="18bpm" className="my-2" /> 
    
    
          <button type="button" className="text-xl text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg  px-5 py-2.5 text-center me-2 mb-2"
          
          onClick={postVitals}
    
          >Submit</button>
    
          
            </div>
          </div>
    
    
    
    
    
      
    
    
          </div>
    
    
    
        </div>
  );
}

export default App;

// TEMPLATE FOR $ IN FRONT OF PRICE INPUT
{
  /* <label htmlFor='price' className='mt-2 text-white'>
        Price
      </label>
      <div className='flex align-middle bg-white'>
        <p className='text-black'>$</p>
        <input
          type='number'
          name='price'
          id='price'
          step='.01'
          placeholder='0.00'
          className='text-black focus:outline-none'
        />
      </div> */
}

// const apiCall = () => {
//   axios.get('http://localhost:8080').then((data) => {
//     console.log(data);
//   })
// }

// GET request to read/view vitals
// const fetchVitals = () => {
//   axios.get('http://localhost:8080/vitals').then((response) => {
//     const vitalData = response.data;
//     console.log(vitalData);
//   })
// }
