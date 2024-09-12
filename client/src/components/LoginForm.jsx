import { useState } from "react";
import axios from "axios";

function LoginForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;
    const newFormData = { ...formData };

    newFormData[inputName] = inputValue;
    setFormData(newFormData);

    console.log("newFormData ~>", newFormData);
  };

  const handleLoginUser = async () => {
    event.preventDefault();
    axios
      .post("http://localhost:8080/users/login", formData, {withCredentials: true})
      .then(function (response) {
        localStorage.setItem('userId', response.data.userId);
        console.log("User logged in successfully:", response.data);
        // ... handle success (e.g., redirect to login page)
      })
      .catch(function (error) {
        console.error("Error logging in user:", error);
        // ... handle error (e.g., display error message)
      });
  };

  return (
    <div id="outerDivCentering" className="flex flex-col items-center justify-center h-screen">
    <div className="flex w-full my-5 border border-red-400 rounded-3xl md:w-2/4 lg:w-1/4">
      <div className="flex items-center justify-center w-full">
        <div
          id="inputFields"
          className="flex flex-col items-center justify-center text-2xl text-black"
        >
          <h1 className="my-2 text-2xl text-white underline">Log in</h1>

          <label className="text-white" htmlFor="Username">
            Username:
          </label>
          <input
            type="text"
            inputMode="text"
            id="ExistingUsername"
            name="username"
            onChange={handleInputChange}
            placeholder=""
            className="my-2"
          />

          <label className="text-white" htmlFor="Password">
            Password:
          </label>
          <input
            type="password"
            inputMode="text"
            id="ExistingPassword"
            name="password"
            onChange={handleInputChange}
            placeholder=""
            className="my-2"
          />

          <button
            type="button"
            className="text-xl text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg  px-5 py-2.5 text-center me-2 mb-2"
            onClick={handleLoginUser}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}

export default LoginForm;
