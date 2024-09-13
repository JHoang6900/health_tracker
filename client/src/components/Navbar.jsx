import axios from "axios";
import { useState, useEffect } from "react";

function Navbar() {
  const [userData, setUserData] = useState([]);
  // const [shouldFetchData, setShouldFetchData] = useState(true); // Flag variable

  const fetchData = async () => {
    try {
      const userObject = await axios.get("http://localhost:8080/users/current", { withCredentials: true });
      console.log("User received successfully.", userObject);
      setUserData(userObject.data);
      console.log('userObject.data ~>', userObject.data);
      console.log('userData ~>', userData);
  
      // setShouldFetchData(false); 
    } catch (error) {
      console.error("Error fetching User data:", error);
    }
  };

  return (
    <div id="outerDivCentering" className="flex items-start justify-center">
      <div className="flex w-full p-4 mt-8 border border-white rounded-3xl md:w-1/4">
        <div className="flex items-center justify-between w-full">
          {" "}
          {/* Added flex container */}
          <h1 className="text-3xl text-white">Hi, User! 👋</h1>
          <button
            type="button"
            className="text-xl text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg  px-5 py-2.5 text-center me-2 mb-2"
          >
            Logout
          </button>


          <button
            type="button"
            className="text-xl text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg  px-5 py-2.5 text-center me-2 mb-2"
            onClick={fetchData}
          >
            GET USER
          </button>
        </div>
      </div>
    </div>
  );
}
export default Navbar;
