import { useState } from 'react';
import axios from 'axios';

const Form = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await axios.post('/api/post', { name, username });
 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="username" placeholder="UserName" value={username} onChange={(e) => setUsername(e.target.value)} required />
      <button type="submit">Submit</button>
    </form>
    </>
  );
};

export default Form;