/* eslint-disable react/no-unescaped-entities */
import { Link } from 'react-router-dom'
import { getAllSavedPins } from '../../api'
import { CircularProgress } from '@mui/material'
import { useEffect, useState } from 'react'

const SavedPins = () => {
    const [loading, setLoading] = useState(true)
    const [savedPins, setSavedPins] = useState(null)
    // console.log(userPosts);

    const getSavedPosts = async () => {
        try {
            setLoading(true)
            const response = await getAllSavedPins()

            // console.log(response);
            if(response){
                if (response.length === 0) {
                    setSavedPins(null);
                  } else {
                    setSavedPins(response);
                  }
                setLoading(false)
            } else {
                throw new Error('Failed to load saved posts')
            }
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    useEffect(() => {
        if(savedPins) {
            setLoading(false);
        } else{
            getSavedPosts()
        }
    }, [savedPins])

    if(savedPins == null){
        return (
            <div className='w-full h-screen flex items-center justify-center'>
            <h1 className='text-2xl text-center'>You Don't Have Saved Pins</h1>
            </div>
        )
    }

  return (
    <>
    {
        loading && 
        <div className="h-screen opacity-70 flex justify-center items-center">
        <CircularProgress style={{ color: 'black' }} />
    </div>
    }
        {savedPins ?
                    <>
                        <div className="savedPins w-full min-h-screen bg-white pt-1">
                            
                            <div className="cards flex justify-center flex-wrap gap-10 px-10 mt-10">
                                {/* {console.log(userPosts)} */}
                                {savedPins?.map((post, i)=>(
                                    // {console.log(post)}
                                    <Link key={i} to={`/savedPins/${post._id}`} post={post}>
                                    <div className="card w-52 h-full cursor-pointer">
                                        <div className="w-52 h-40 bg-gray-100 rounded-lg overflow-hidden">
                                            <img className="w-full h-full object-cover" src={`${post.image}`} alt="" />
                                        </div>
                                        <h3 className="text-xl text-center font-semibold mt-3 cursor-pointer">{post.title}</h3>
                                    </div>
                                    </Link>
  ))
  }
                            </div>
                        </div>
                    </> :
                    <>
                        <div className="h-screen opacity-70 flex justify-center items-center">
                            <CircularProgress style={{ color: 'black' }} />
                        </div>
                    </>
            }
    </>
  )
}

export default SavedPins