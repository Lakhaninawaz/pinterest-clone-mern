/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signIn } from '../../api'
import { CircularProgress } from '@mui/material'
import { useAuth } from '../../store/auth'

const Login = () => {

  const [ loading, setLoading ] = useState(false);

  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: ""
  })
  const [error, setError] = useState("")

  const { storetokenInLS } = useAuth();
  const onLogin = async (e) => {
    e.preventDefault()
    setLoading(true);
    if (user.username === '' || user.email === '' || user.password === '') {
      setLoading(false)
      setError("All fields are required.")
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      setLoading(false)
      setError("Please enter a valid e-mail address.")
    } else {
      const response = await signIn(user);

      // console.log(response);

      if (response.status !== 200) {
        setError(response.data.message);
        setLoading(false)
      } else {
        setLoading(false)
        storetokenInLS(response.data.token)
        navigate("/profile");
      }
    }

  }

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className='w-96 border shadow-xl shadow-black border-black rounded-md px-4 py-6'>
        <h1 className='text-3xl text-center leading-none capitalize'>Welcome Back to Pinterest</h1>
        <form method='POST' onSubmit={onLogin} className='mt-8' >
          <label className='block ml-2 mt-4' htmlFor='email'>Email:</label>
          <input
            onChange={e => setUser({ ...user, email: e.target.value })}
            className='block w-full px-3 py-2 border border-gray-300 rounded-xl' type='email' name='email' placeholder='Email' />
          <label className='block ml-2 mt-4' htmlFor='password'>Password:</label>
          <input
            onChange={e => setUser({ ...user, password: e.target.value })}
            className='block w-full px-3 py-2 border border-gray-300 rounded-xl' type='password' name='password' placeholder='Enter a Password' />
          <Link to='' className='block mt-5'>Forgot your Password?</Link>
          {error && <div className='text-center text-red-600 mt-6 animate-pulse'>{error}</div>}
          <button className='mt-6 w-full px-3 py-2 bg-red-600 rounded-xl text-white' type='submit'>{loading ? <CircularProgress style={{ color: 'white' }} /> : "Login"}</button>
          <p className='text-center mt-3'>Don't have account? <Link to="/signup" className='pointer'><b>Signup</b></Link></p>
        </form>
      </div>
    </div>
  )
}

export default Login