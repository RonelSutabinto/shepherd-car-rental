import { useState } from 'react';
import axios from 'axios';
import UpdateForm from './home/UpdateForm';


const DataList = ({ data }) => {
    const [showUpdateForm, setShowUpdateForm] = useState(null);
  
    const handleDelete = async (id: any) => {
      try {
        await axios.delete(`/api/cars/delete?id=${id}`);
        // Handle success (e.g., show a success message)
      } catch (error) {
        console.error(error);
      }
    };
  
    return (
        <div>
          {data.length === 0 ? (
              <p className="no-result">No Users found</p>
            ) : (
              <>
              <div>Ronel</div>
              <ul>
                {data.map((item: any) => (
                  <li key={item._id}>
                    {item.name} - {item.username}
                    <button onClick={() => setShowUpdateForm(item)}>Update</button>
                    <button onClick={() => handleDelete(item._id)}>Delete</button>
          
                    {showUpdateForm && showUpdateForm._id === item._id && (
                      <UpdateForm data={showUpdateForm} onClose={() => setShowUpdateForm(null)} />
                    )}
                  </li>
                ))}
              </ul>
              </>
            

        )} 
      </div>
    );
  };
  
  export default DataList;