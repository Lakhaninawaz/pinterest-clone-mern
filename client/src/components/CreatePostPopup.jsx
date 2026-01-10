/* eslint-disable react/prop-types */
import { useState, useRef } from 'react';
import { CircularProgress } from '@mui/material'
import { createPost } from '../api';
import { useAuth } from '../store/auth';

const CreatePostPopup = ({onClose, convert, onCreated}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState('');
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const { refreshUser } = useAuth();

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
        // notify parent to show loading, then refresh user and close
        onCreated && onCreated();
        await refreshUser();
        setLoading(false)
        onClose();
      } else {
        setLoading(false)
        // Handle errors (e.g., display error message)
        console.error('Error creating post:', response.statusText);
        // keep modal open to show error
      }
    } catch (error) {
      setLoading(false)
      setError(error?.response?.data?.message || 'Error creating post');
      console.error('Error creating post:', error);
    }
  };

  // const handleChange = (event) => {
  //   const file = event.target.files[0];
  //   setSelectedFile(file); // Update state with selected file
  // };

  return (
    <div className="w-full">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900" id="create-post-modal-title">Create Pin</h2>
        </div>

        <div className="space-y-6">
          {/* Image Dropzone */}
          <label htmlFor="file-input" className="block">
            <input
              accept=".jpg,.jpeg,.png"
              type="file"
              id="file-input"
              name="postImg"
              className="hidden"
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />
            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
              {selectedFile ? (
                <div className="flex items-center justify-center gap-3">
                  <i className="ri-image-2-line text-red-500"></i>
                  <p className="text-sm text-gray-700">{selectedFile.name}</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-2 text-gray-600">
                  <i className="ri-upload-cloud-2-line text-2xl text-red-500"></i>
                  <p className="text-sm">Drag & drop image, or click to select</p>
                </div>
              )}
            </div>
          </label>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              placeholder="Enter a catchy title"
              ref={titleRef}
              maxLength={100}
              className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              placeholder="Describe your pin"
              ref={descriptionRef}
              maxLength={1000}
              className="w-full resize-none border border-gray-300 p-3 rounded-xl h-32 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleCreatePost}
              className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              Create Pin
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-semibold text-gray-700 transition-colors"
            >
              Cancel
            </button>
          </div>

          {/* Error & Loading */}
          {error && <div className="text-center text-red-600 mt-2">{error}</div>}
          {loading && (
            <div className="w-full flex justify-center items-center py-3">
              <CircularProgress style={{ color: '#ef4444' }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatePostPopup;
