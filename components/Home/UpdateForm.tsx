import { useState } from 'react';
import axios from 'axios';

const UpdateForm = ({ data, onClose }: any) => {
  const [name, setName] = useState(data.name);
  const [email, setEmail] = useState(data.email);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await axios.put(`/api/put`, { id: data._id, name, email });
      // Handle success (e.g., show a success message)
      // Close the update form if needed
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <button type="submit">Update</button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
};

export default UpdateForm;