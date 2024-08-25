import { useState } from 'react';
import axios from 'axios';

function RegistrationForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;
    const newFormData = { ...formData};
    
    newFormData[inputName] = inputValue; 
    setFormData(newFormData);

    console.log('newFormData ~>',newFormData);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/api/users/register', formData);
      console.log('User registered successfully:', response.data);
      // ... handle success (e.g., redirect to login page)
    } catch (error) {
      console.error('Error registering user:', error);
      // ... handle error (e.g., display error message)
    }
  };

  return (
   <div>
    <h1 className='text-2xl font-bold text-red-700'>Register</h1>
    <form onSubmit={handleSubmit}>
      {/* ... your registration form fields (username, password) */}
      <button type="submit">Register</button>
    </form>
    </div> 
  );
}

export default RegistrationForm;