import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { getAllPosts } from "../../api";
import { CircularProgress } from '@mui/material'
import { useAuth } from "../../store/auth";
import Swal from "sweetalert2";

const Posts = () => {

    const {removetokenInLS} = useAuth()

    const [allPosts, setAllPosts] = useState(null);
    // console.log(user.profileImage);
    const [loading, setLoading] = useState(true);

    const getPosts = async ()=>{
      try {
        const response = await getAllPosts();
        // console.log(response);
        if (response.status === 200) {
            if(response.data.posts.length === 0){
                setAllPosts(null);
            } else{
                setAllPosts(response.data.posts);
            }
          setLoading(false);
        } else{
            if(response.message.data === "Token Expired"){
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
              
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    useEffect(() => {
        if (allPosts) {
            setLoading(false);
        } else{
          getPosts()
        }
    }, [allPosts])

if(loading){
  return(
    <div className="h-screen opacity-70 flex justify-center items-center">
    <CircularProgress style={{ color: 'black' }} />
</div>
  )
}

if(allPosts == null){
    return (
        <div className='w-full h-screen flex items-center justify-center'>
        <h1 className='text-2xl text-center'>No Post Found!</h1>
        </div>
    )
}

    return (
        <>
            {allPosts !== null ?
                <>
                    <div className="posts w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-1">
                        <div className="max-w-7xl mx-auto px-4 py-8">
                            <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Explore Pins</h1>
                            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                                {allPosts?.map((post, i)=>(
                                    <Link key={i} to={`/posts/${post._id}`} post={post}>
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

export default Posts