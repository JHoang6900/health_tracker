function PatientList() {
    return (
      <div id="outerDivCentering" className="flex items-center justify-center h-screen">
        <div className="w-full p-6 border border-white shadow-md rounded-3xl md:w-1/4"> {/* Card container */}
  
          <h1 className="mb-2 text-2xl font-semibold text-white"> 
            Alice Johnson <span className="text-gray-500">| ID 03</span>
          </h1>
  
          <div className="text-gray-400">
            <p className="mb-1"> 
              <span className="font-medium text-green-400">Last Recorded:</span> 2024-08-10 09:30:00 {/* text-green-400 if recent | text-red-400 if old */}
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
  
        </div>
      </div>
    );
  }
export default PatientList;
