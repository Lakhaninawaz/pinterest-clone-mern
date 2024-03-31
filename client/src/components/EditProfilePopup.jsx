/* eslint-disable react/prop-types */
import { useState } from 'react';
import { CircularProgress } from '@mui/material'
import { editProfile } from '../api';

const EditProfilePopup = ({onClose}) => {
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState('');
  const [user, setUser] = useState({
    username: '',
    name: '',
    contact: ''
  });

  const handleEditProfile = async (e) => {
    setLoading(true)
    e.preventDefault()
    if (user.name === '' && user.username === '' && user.contact === '') {
      setError("What You Want to Change Man!");
      setLoading(false)
      return;
    }

    try {
      // console.log(user);
      const response = await editProfile(user);
      
      // console.log(response);
      if (response.status === 200) {
        setLoading(false)
        // console.log('Post created successfully!');
        onClose();
      } else if(response.status === 309){
        setError(response.data.message);
        setLoading(false);
      } else {
        setLoading(false)
        // Handle errors (e.g., display error message)
        console.error('Error creating post:', response.statusText);
        onClose();
      }
    } catch (error) {
      setLoading(false)
      // Handle network or other errors
      console.error('Error creating post:', error);
    }
  };

  if(loading) {
    return (
        loading &&
        <div className="h-full flex justify-center items-center">
                          <CircularProgress style={{ color: 'black' }} />
                      </div>
    )
  }

  return (
    <>
    
          <div className="flex flex-col justify-center max-w-xl">
            <h2 className="text-xl font-semibold" id="create-post-modal-title">
              Edit Profile
            </h2>
            
          <label className='block ml-1 mb-1 mt-4' htmlFor='username'>Username:</label>
            <input
            value={user.username}
              label="username"
              placeholder="Enter UserName"
              onChange={ (e)=>setUser({...user, username: e.target.value}) }
              name="username"
              type="text"
              max={25}
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:ring-red-500 focus:ring-opacity-50"
            />
          <label className='block ml-1 mb-1 mt-4' htmlFor='name'>Name:</label>
            <input
            value={user.name}
              label="name"
              placeholder="Enter Name"
              onChange={ (e)=>setUser({...user, name: e.target.value}) }
              name="name"
              type="text"
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:ring-red-500 focus:ring-opacity-50"
            />
          <label className='block ml-1 mb-1 mt-4' htmlFor='contact'>Contact:</label>
            <input
            value={user.contact}
              label="contact"
              placeholder="Enter Contat Number"
              onChange={ (e)=>setUser({...user, contact: e.target.value}) }
              name="contact"
              type="number"
              maxLength={10}
              className="border border-gray-300 p-2 mt-0 rounded-md focus:outline-none focus:ring focus:ring-red-500 focus:ring-opacity-50"
            />
            <button
              type="button"
              onClick={handleEditProfile}
              className="text-white px-7 py-2 mt-7 bg-red-500 rounded-lg text-sm font-semibold hover:bg-red-600"
            >
              Create Post
            </button>
      {error && <div className='text-center text-red-600 mt-2 animate-pulse'>{error}</div>}

          </div>

    </>
  );
};

export default EditProfilePopup;
