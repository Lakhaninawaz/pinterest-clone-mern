/* eslint-disable react/no-unescaped-entities */
import { useAuth } from '../../store/auth'
import { Link } from 'react-router-dom'
import { CircularProgress } from '@mui/material'
import { useEffect, useState } from 'react'

const CreatedPins = () => {
    const [loading, setLoading] = useState(true)
    const {userPosts} = useAuth()

    useEffect(() => {
        if(userPosts !== '') {
            setLoading(false);
        }
    }, [userPosts])

    if(loading){
        return (
            <div className="h-screen opacity-70 flex justify-center items-center">
                <CircularProgress style={{ color: 'black' }} />
            </div>
        )
    }

    if(userPosts === '' || !userPosts || userPosts.length === 0){
        return (
            <div className='w-full h-screen flex items-center justify-center'>
                <h1 className='text-2xl text-center'>You Don&apos;t Have Your Created Pins</h1>
            </div>
        )
    }

  return (
    <>
        <div className="CreatedPins w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-1">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Uploaded Pins</h1>
                
                <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                    {userPosts?.map((post, i)=>(
                        <Link key={i} to={`/CreatedPins/${post._id}`} post={post}>
                            <div className="card break-inside-avoid mb-6 group cursor-pointer transform transition-all duration-300 hover:scale-[1.02]">
                                <div className="relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300">
                                    <img 
                                        className="w-full h-auto object-cover" 
                                        src={`${post.image}`} 
                                        alt={post.title} 
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                        <h3 className="text-white font-semibold text-lg drop-shadow-lg">{post.title}</h3>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    </>
  )
}

export default CreatedPins