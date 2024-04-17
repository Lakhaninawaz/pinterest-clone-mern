/* eslint-disable react/prop-types */
import { createContext, useState, useEffect, useContext } from 'react';
import { getCurrentUser, getUserPosts } from '../api';
import Swal from 'sweetalert2';

export const AuthContext = createContext();

// export const UserDataContext = createContext({
//   userData: null,
//   setUserData: () => {},
//   isLoggedIn: false,
//   setIsLoggedIn: () => {},
// });

export const useAuth = () => {
  const AuthContextValue = useContext(AuthContext);

  if (!AuthContextValue) {
    throw new Error('useAuth must be used within the AuthProvider');
  }
  return AuthContextValue;
}

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState('');
  const [userPosts, setUserPosts] = useState('');
  
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);

  // console.log("isLoggedIn: ", isLoggedIn);
  // console.log("token: ", token);

  const storetokenInLS = (token) => {
    localStorage.setItem("token", token);
    setToken(token)
    currentUser()
    return setIsLoggedIn(true);
  }

  const removetokenInLS = () => {
    setIsLoggedIn(false);
    setUser(null);
    setToken(undefined)
    return localStorage.removeItem("token")
  }

  const setUserNull = () => {
    setUser(null)
  }
  const setUserPostNull = () => {
    setUserPosts(null)
  }

  const currentUser = async () => {
    try {
      const response = await getCurrentUser();

      // console.log(response);
      if (response.status === 200) {
        // console.log(response.data);
        setUser(response.data.user);
      setUserPosts(response.data.user.posts);
      } 
       else{
        // console.log(response);
        Swal.fire({
          icon: "error",
          text: response.response.data.message,
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
      })
      removetokenInLS();
    }

      //   removetokenInLS()
      // }
    } catch (error) {
      console.log(error);
    }
  }

  const getPosts = async () => {
    try {
      const response = await getUserPosts();

      // console.log(response);
      if (response.status === 200) {
        // console.log(response.data);
        // setUser(response.data.user);
        setUserPosts(response.data);
      } 
       else{
        // console.log(response);
        Swal.fire({
          icon: "error",
          text: response.response.data.message,
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
      })
      removetokenInLS();
    }

      //   removetokenInLS()
      // }
    } catch (error) {
      console.log(error);
    }
  }

  // Fetch user data when the component mounts.
  useEffect(() => {
    
    if (user) return;

    if (isLoggedIn) {
    // if (isLoggedIn && token) {
      currentUser()
    }
  }, [user, isLoggedIn]);
  

  const contextValue = {
    user,
    userPosts,
    token,
    isLoggedIn,
    removetokenInLS,
    storetokenInLS,
    setUserNull,
    setUserPostNull,
    getPosts
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
