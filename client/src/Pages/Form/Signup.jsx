import { useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import { signupUser } from '../../api';
import {Link, useNavigate} from "react-router-dom"


const Signup = () => {
  const navigate = useNavigate();
  const  [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    contact: ""
})
const [error, setError] = useState('');
const [loading, setLoading] = useState(false)

const onSignup = async (event) => {

  event.preventDefault();

  setLoading(true)

  if (user.username === '' || user.email === '' || user.password === ''){
    return setError("All fields are required.")
  } else if (!/\S+@\S+\.\S+/.test(user.email)){
    return setError("Please enter a valid e-mail address.")
  } else {
    const response = await signupUser(user);
    // console.log(response);
    // console.log(response.status);

    if (response.status !== 200) {
      setError(response.data.message)
      setLoading(false)
    } else{
      setLoading(false)
      navigate("/login")
    }
}
}

  return (
    <div  className="w-full h-screen flex items-center justify-center">
      <div className='w-96 border shadow-xl shadow-black border-black rounded-md px-4 py-6'>
        <h1 className='text-3xl text-center leading-none capitalize'>Welcome to Pinterest</h1>
      <form method="POST" onSubmit={onSignup} className='mt-8'>
        <label className='block ml-2 mt-4' htmlFor='username'>Username:</label>
        <input
        onChange={(e) => setUser({...user, username : e.target.value})}
        value={user.username}
        className='block w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline focus:outline-2 focus:outline-black' type='text' name='username' placeholder='Username' />
        <label className='block ml-2 mt-4' htmlFor='email'>Email:</label>
        <input
        onChange={(e) => setUser({...user, email : e.target.value})}
        value={user.email}
        className='block w-full px-3 py-2 border border-gray-300 rounded-xl' type='email' name='email' placeholder='Email' />
        <label className='block ml-2 mt-4' htmlFor='contact'>Contact:</label>
        <input 
        onChange={(e) => setUser({...user, contact : e.target.value})}
        value={user.contact}
        className='block w-full px-3 py-2 border border-gray-300 rounded-xl' type='number' name='contact' placeholder='Mobile Number' />
        <label className='block ml-2 mt-4' htmlFor='password'>Password:</label>
        <input 
        onChange={(e) => setUser({...user, password : e.target.value})}
        value={user.password}
        className='block w-full px-3 py-2 border border-gray-300 rounded-xl' type='password' name='password' placeholder='Create a Password' />
        {error && <div className="mt-6 text-red-600 text-center animate-pulse">{error}</div>}
        <button
        type='submit'
        className='mt-6 w-full px-3 py-2 bg-red-600 rounded-xl text-white'>{loading ?  <CircularProgress style={{ color: 'white' }} /> : "Sign Up" }</button>
        <p className='text-center mt-3'>Alredy have account? <Link to="/login" className='pointer'><b>Login</b></Link></p>
      </form>
      </div>
    </div>
  )
}

export default Signup