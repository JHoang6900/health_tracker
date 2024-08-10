import axios from 'axios';


const apiCall = () => {
  axios.get('http://localhost:8080').then((data) => {
    console.log(data);
  })
}
function App() {
  return (
    <div id="outerDivCentering" className="flex items-center justify-center h-screen">

      

<div className="flex w-full border border-white rounded-3xl md:w-1/4">


      <div className="flex items-center justify-center w-full">
      <div id="inputFields" className="flex flex-col items-center justify-center text-2xl text-black">


      <label className="mt-8 text-white" htmlFor="bloodPressure">Date + Time:</label>
      <input type="datetime-local" id="datetime" className="my-2 text-black" />

      <label className="text-white" htmlFor="bloodPressure">Blood Pressure (systolic/diastolic):</label>
      <input type="number" id="bloodPressure" name="bloodPressure" pattern="[0-9]+/[0-9]+" placeholder="120/80" className="my-2" /> 

      <label className="text-white" htmlFor="Pulse">Pulse (bpm):</label>
      <input type="number" inputMode="numeric" id="Pulse" name="Pulse" placeholder="57bpm" className="my-2" /> 

      <label className="text-white" htmlFor="Oxygen">Oxygen %:</label>
      <input type="number" inputMode="numeric" id="Oxygen" name="Oxygen" placeholder="94%" className="my-2" /> 

      <label className="text-white" htmlFor="Temperature">Temperature:</label>
<div className="flex items-center my-2">
  <input 
    type="number"
    inputMode="decimal"
    id="Temperature" 
    name="Temperature" 
    placeholder="98.6°F" 
  />
</div>








      <label className="text-white" htmlFor="Respiration">Respiration (bpm):</label>
      <input type="number" inputMode="numeric" id="Respiration" name="Respiration" placeholder="18bpm" className="my-2" /> 


      <button type="button" className="text-xl text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg  px-5 py-2.5 text-center me-2 mb-2"
      
      onClick={apiCall}

      >Submit</button>

      
        </div>
      </div>





  


      </div>



    </div>
  );
}


export default App;





{/* <label htmlFor='price' className='mt-2 text-white'>
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
      </div> */}
