import { Link, NavLink, useNavigate } from "react-router-dom"
import { logOut } from "../api"
import { useAuth } from "../store/auth"
import { useState } from "react"

const Header = () => {

  const navigate = useNavigate()

const { isLoggedIn, removetokenInLS } = useAuth({})

const [openNav, setOpenNav] = useState(false);

const toggleNav = () => {
  setOpenNav(!openNav);
};

const navList = () => {
  return (
      // <>
      //     <NavLink
      //         to="/"
      //         className={({ isActive, isPending }) =>
      //             isPending ? "pending" : isActive ? "text-blue-900" : ""
      //         }
      //     >
      //         Home
      //     </NavLink>
      //     <NavLink
      //         to="/event"
      //         className={({ isActive, isPending }) =>
      //             isPending ? "pending" : isActive ? "text-blue-900" : ""
      //         }
      //     >
      //         Event
      //     </NavLink>
      //     <NavLink
      //         to="/services"
      //         className={({ isActive, isPending }) =>
      //             isPending ? "pending" : isActive ? "text-blue-900" : ""
      //         }
      //     >
      //         Services
      //     </NavLink>
      //     <NavLink
      //         to="/registration"
      //         className={({ isActive, isPending }) =>
      //             isPending ? "pending" : isActive ? "text-blue-900" : ""
      //         }
      //     >
      //         Registration
      //     </NavLink>
      // </>
      <>
       {!isLoggedIn ?
          <>
      <NavLink className='px-5 py-2 me-3 bg-red-500 rounded-full text-white font-bold' to="/login">Log in</NavLink>
      <NavLink className='px-5 py-2 me-3 bg-zinc-300 rounded-full text-white font-bold' to="/signup">Sign Up</NavLink>
      </> : <>
      <NavLink className='px-5 py-2 me-3 bg-zinc-300 rounded-full text-black font-bold' to={"/posts"}>Feed</NavLink>
      <NavLink className='px-5 py-2 me-3 bg-zinc-300 rounded-full text-black font-bold' to={"/profile"}>Profile</NavLink>
      <NavLink className='px-5 py-2 me-3 bg-red-500 rounded-full text-white font-bold' onClick={Logout}>Log Out</NavLink>
     
          </>
          }
          </>
  );
};

  const Logout = async ()=>{
    const response = await logOut();
    // console.log(response);
    if (response.status === 200) {
      removetokenInLS();
      navigate("/");
    }
  }

  // useEffect(() => {
    
  // }, [])
  

  return (
    <>

<header className="w-full h-20 object-cover flex items-center justify-between flex-col md:flex-row">
                <div className="w-full h-full md:w-fith-full flex items-center justify-between">
                    <Link to="/" className="text-2xl font-semibold text-gray-800">
                    <img className='w-56 h-22' src="https://download.logo.wine/logo/Pinterest/Pinterest-Logo.wine.png" alt="" />
                    </Link>
                    <button
                        onClick={toggleNav}
                        className="block md:hidden me-2 border border-gray-600 p-2 rounded text-gray-600 hover:bg-gray-100  focus:bg-gray-100"
                    >
                        <svg
                            className={`w-6 h-6 ${openNav ? 'hidden' : 'block'}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16m-7 6h7"
                            ></path>
                        </svg>
                        <svg
                            className={`w-6 h-6 ${openNav ? 'block' : 'hidden'}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            ></path>
                        </svg>
                    </button>
                </div>
            <div className="md:me-2 w-full mx-auto md:mx-0 md:flex md:items-center md:justify-end z-50">

                <nav className="hidden md:flex space-x-4">
                    {navList()}
                </nav>

                <div
                    onClick={()=>setOpenNav(false)}
                    className={`${openNav ? '' : 'hidden'
                        } bg-white drop-shadow-xl md:hidden flex flex-col items-center justify-center gap-4 p-3 `}
                >
                    {navList()}
                </div>
            </div>

        </header>




    {/* <nav className='h-20 object-cover flex items-center justify-between'>
        <img className='w-56 h-22' src="https://download.logo.wine/logo/Pinterest/Pinterest-Logo.wine.png" alt="" />
        <div className="buttonss">
          {!isLoggedIn ?
          <>
      <Link className='px-5 py-2 me-3 bg-red-500 rounded-full text-white font-bold' to="/login">Log in</Link>
      <Link className='px-5 py-2 me-3 bg-zinc-300 rounded-full text-white font-bold' to="/signup">Sign Up</Link>
      </> : <>
      <Link className='px-5 py-2 me-3 bg-zinc-300 rounded-full text-black font-bold' to={"/posts"}>Feed</Link>
      <Link className='px-5 py-2 me-3 bg-zinc-300 rounded-full text-black font-bold' to={"/profile"}>Profile</Link>
      <Link className='px-5 py-2 me-3 bg-red-500 rounded-full text-white font-bold' onClick={Logout}>Log Out</Link>
      
      </>
          }
      </div>
    </nav> */}
    </>
  )
}

export default Header