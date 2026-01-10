import './App.css'
import PropTypes from 'prop-types'
import Footer from './components/Footer'
import Header from './components/Header'
import Home from './components/Home'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './Pages/Form/Login'
import Signup from './Pages/Form/Signup'
import Profile from './Pages/Profile/Profile'
import PublicProfile from './Pages/Profile/PublicProfile'
import { useAuth } from './store/auth'
import SavedPins from './Pages/Pins/SavedPins'
import PinsData from './Pages/Pins/PinsData'
import Posts from './Pages/Feed/Posts'
import NotFound from './Pages/Not Found/NotFound'
import CreatedPins from './Pages/Pins/CreatedPins'

import { inject } from '@vercel/analytics';
 
inject({ mode:  'production' });

function App() {

  const { isLoggedIn } = useAuth();

  // Route guards
  const ProtectedRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/login" replace />;
  };

  const PublicOnlyRoute = ({ children }) => {
    return isLoggedIn ? <Navigate to="/" replace /> : children;
  };

  ProtectedRoute.propTypes = {
    children: PropTypes.node
  };

  PublicOnlyRoute.propTypes = {
    children: PropTypes.node
  };

  return (
    <>
      <Header />

      <Routes>
        <Route path='/' element={<Home />} />
        
        {/* Public-only routes redirect to home when logged in */}
        <Route path='/login' element={<PublicOnlyRoute><Login /></PublicOnlyRoute>} />
        <Route path='/signup' element={<PublicOnlyRoute><Signup /></PublicOnlyRoute>} />

        {/* Protected routes redirect to login when not authenticated */}
        <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path='/profile/:username' element={<ProtectedRoute><PublicProfile /></ProtectedRoute>} />
        <Route path='/createdPins' element={<ProtectedRoute><CreatedPins /></ProtectedRoute>} />
        <Route path='/createdPins/:id' element={<ProtectedRoute><PinsData /></ProtectedRoute>} />
        <Route path='/savedPins' element={<ProtectedRoute><SavedPins /></ProtectedRoute>} />
        <Route path='/savedPins/:id' element={<ProtectedRoute><PinsData /></ProtectedRoute>} />
        <Route path='/posts' element={<ProtectedRoute><Posts /></ProtectedRoute>} />
        <Route path='/posts/:id' element={<ProtectedRoute><PinsData /></ProtectedRoute>} />

        <Route path='/*' element={<NotFound/>}/>
      </Routes>

      <Footer />
    </>
  )
}

export default App
