import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import Home from './components/Home'
import { Routes, Route } from 'react-router-dom'
import Login from './Pages/Form/Login'
import Signup from './Pages/Form/Signup'
import Profile from './Pages/Profile/Profile'
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

  return (
    <>
      <Header />

      <Routes>
        <Route path='/' element={<Home />} />
        <>
          <Route path='/profile' element={isLoggedIn ? <Profile /> : <Login />} />
          <Route path='/signup' element={!isLoggedIn ? <Signup /> : <Home/>} />
          <Route path='/login' element={!isLoggedIn ? <Login /> : <Home/>} />
          <Route path='/createdPins' element={isLoggedIn ? <CreatedPins /> : <Login />} />
          <Route path='/createdPins/:id' element={isLoggedIn ? <PinsData /> : <Login />} />
          <Route path='/savedPins' element={isLoggedIn ? <SavedPins /> : <Login />} />
          <Route path='/savedPins/:id' element={isLoggedIn ? <PinsData /> : <Login />} />
          <Route path='/posts' element={isLoggedIn ? <Posts /> : <Login />} />
          <Route path='/posts/:id' element={isLoggedIn ? <PinsData /> : <Login />} />

        </>
        <Route path='/*' element={<NotFound/>}/>
      </Routes>

      <Footer />
    </>
  )
}

export default App
