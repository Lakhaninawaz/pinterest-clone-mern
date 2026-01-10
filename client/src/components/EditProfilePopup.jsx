/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material'
import { editProfile } from '../api';
import { useAuth } from '../store/auth';

const EditProfilePopup = ({onClose}) => {
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState('');
  const { user: currentUser, refreshUser } = useAuth();
  const [form, setForm] = useState({
    username: currentUser?.username || '',
    name: currentUser?.name || '',
    contact: currentUser?.contact || ''
  });

  // Keep form in sync when auth user changes
  useEffect(() => {
    if (currentUser) {
      setForm({
        username: currentUser.username || '',
        name: currentUser.name || '',
        contact: currentUser.contact || ''
      });
    }
  }, [currentUser]);

  const handleEditProfile = async (e) => {
    setLoading(true)
    e.preventDefault()
    if (form.name === '' && form.username === '' && form.contact === '') {
      setError("What You Want to Change Man!");
      setLoading(false)
      return;
    }

    try {
      const response = await editProfile(form);
      
      // console.log(response);
      if (response.status === 200) {
        // refresh user details immediately for snappy UI
        await refreshUser();
        setLoading(false)
        onClose();
      } else if (response.status === 400) {
        // Username already taken or bad request
        setError(response.data?.message || 'Username Already Taken!');
        setLoading(false);
      } else {
        setLoading(false)
        // Keep modal open and show error
        setError(response.data?.message || 'Error updating profile');
        console.error('Error updating profile:', response.statusText);
      }
    } catch (error) {
      setLoading(false)
      // Show server-provided error message if available
      const msg = error?.response?.data?.message || 'Error updating profile';
      setError(msg);
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="w-full">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900" id="edit-profile-modal-title">Edit Profile</h2>
        </div>

        <div className="space-y-4">
          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              id="username"
              value={form.username}
              placeholder="Enter username"
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              name="username"
              type="text"
              maxLength={25}
              className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              id="name"
              value={form.name}
              placeholder="Enter name"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              name="name"
              type="text"
              className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Contact */}
          <div>
            <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
            <input
              id="contact"
              value={form.contact}
              placeholder="Enter contact number"
              onChange={(e) => setForm({ ...form, contact: e.target.value })}
              name="contact"
              type="tel"
              inputMode="numeric"
              maxLength={10}
              className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleEditProfile}
              className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              Save Changes
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

export default EditProfilePopup;
