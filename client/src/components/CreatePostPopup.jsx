/* eslint-disable react/prop-types */
import { useState, useRef } from 'react';
import { CircularProgress } from '@mui/material'
import { createPost } from '../api';

const CreatePostPopup = ({onClose, convert}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState('');
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

  const handleCreatePost = async (e) => {
    setLoading(true)
    e.preventDefault()

    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
// console.log(title, description, selectedFile);
    // Implement form data preparation and POST request logic here
    // const formData = new FormData();
    // formData.append('postImg', selectedFile);
    // formData.append('title', title);
    // formData.append('description', description);

    if(selectedFile === null){
      setError("Please select an image to upload!");
      setLoading(false)
      return;
    } else if (!title || !description) {
      setError("Title or Description cannot be empty");
      setLoading(false)
      return;
    }
    try {
      const base64 = await convert(selectedFile);
      // console.log(base64);
      const response = await createPost({title, description, image: base64})
      // console.log(response);
      if (response.status === 200) {
        setLoading(false)
        console.log('Post created successfully!');
        onClose();
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

  // const handleChange = (event) => {
  //   const file = event.target.files[0];
  //   setSelectedFile(file); // Update state with selected file
  // };

  return (
    <>
    {
      loading &&
      <div className="h-screen opacity-70 flex justify-center items-center">
                        <CircularProgress style={{ color: 'black' }} />
                    </div>
    }
          <div className="flex flex-col space-y-4">
            <h2 className="text-xl font-semibold" id="create-post-modal-title">
              Create Post
            </h2>
            
            <label htmlFor="file-input">
        <input
          accept=".jpg,.jpeg,.png"
          type="file"
          id="file-input"
          name='postImg'
          className="hidden" // Hide the default file input
          onChange={(e)=> setSelectedFile(e.target.files[0])}
        />
        <p className='cursor-pointer'>Drag and drop an image here, or click to select.</p>
      </label>
      {selectedFile && (
        <div className="mt-2">
          <p>Selected file: {selectedFile.name}</p>
        </div>
      )}
            <input
              label="Title"
              placeholder="Enter post title"
              ref={titleRef}
              maxLength={100}
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:ring-red-500 focus:ring-opacity-50"
            />
            <textarea
              label="Description"
              placeholder="Write a detailed description"
              ref={descriptionRef}
              maxLength={1000}
              className="resize-none border border-gray-300 p-2 rounded-md h-40 focus:outline-none focus:ring focus:ring-red-500 focus:ring-opacity-50"
            />
            <button
              type="button"
              onClick={handleCreatePost}
              className="text-white px-7 py-2 mt-2 bg-red-500 rounded-lg text-sm font-semibold hover:bg-red-600"
            >
              Create Post
            </button>
      {error && <div className='text-center text-red-500 mt-6 animate-pulse'>{error}</div>}

          </div>

    </>
  );
};

export default CreatePostPopup;
