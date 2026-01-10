import { Link, useNavigate, useParams } from "react-router-dom"
import { deSavedPost, deletePostById, getPostData, savePost } from "../../api"
import { useEffect, useState } from "react"
import { CircularProgress } from "@mui/material"
import { useAuth } from "../../store/auth"


const PinsData = () => {
  const { id } = useParams()

  const navigate = useNavigate();

  const [post, setPost] = useState()
  const [loading, setLoading] = useState(true);
  const {getPosts, user, setUserNull } = useAuth();
  const [saved, setSaved] = useState(user?.boards?.includes(id) ? true : false);

  const postData = async () => {
    setLoading(true)
    try {
      const response = await getPostData(id)

      // console.log(response);
      if (response.status === 200) {
        // console.log(response.data);
        setPost(response.data);
        setLoading(false)
      }
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }

  const savedPost = async () => {
    setLoading(true)
    try {
      const response = await savePost(post._id);

      // console.log(response);
      if (response.status === 200) {
        // console.log(response.data);
        setSaved(true);
        setUserNull()
        setLoading(false)
      }
      //  else {
      //   // console.log(response);
      //   setPost(response.data)
      // }
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }
  
  const discardSavedPost = async () => {
    setLoading(true)

    try {
      const response = await deSavedPost(post._id);

      // console.log(response);
      if (response.status === 200) {
        // console.log(response.data);
        setSaved(false);
        setUserNull()
        setLoading(false)
      }
      //  else {
      //   // console.log(response);
      //   setPost(response.data)
      // }
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!post) {
      postData();
    } else {
      setLoading(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const deletePost = async () => {
    setLoading(true)

    try {
      const response = await deletePostById(id)

      // console.log(response);
      if (response.status === 200) {
        // console.log(response.data);
        setPost(response.data);
        getPosts()
        setLoading(false)
        navigate("/profile");
      }
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }

  if(loading){
    return (
      <div className="h-screen opacity-70 flex justify-center items-center">
        <CircularProgress style={{ color: 'black' }} />
      </div>
    )
  }

  // { console.log(post) }
  return (
    post ? <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Image Section */}
              <div className="lg:w-1/2 bg-gray-900 flex items-center justify-center p-8">
                <img
                  src={`${post.image}`}
                  alt={post.title}
                  className="w-full h-auto max-h-[600px] object-contain rounded-2xl shadow-2xl"
                />
              </div>
              
              {/* Content Section */}
              <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col">
                <div className="flex-grow">
                  <h1 className="text-4xl font-bold text-gray-900 mb-6">{post.title}</h1>
                  
                  <div className="mb-6">
                    <p className="text-gray-600 text-lg leading-relaxed">{post.description}</p>
                  </div>
                  
                  {/* Author Info */}
                  <div className="flex items-center mb-8 p-4 bg-gray-50 rounded-xl">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                      {post.user.username.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Posted by</p>
                      {post.user.username === user?.username ? (
                        <span className="text-gray-900 font-semibold">{post.user.username} (you)</span>
                      ) : (
                        <Link to={`/profile/${post.user.username}`} className="text-red-600 hover:text-red-700 font-semibold transition-colors">
                          {post.user.username}
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
                  {post.user?.username === user?.username && (
                    <button 
                      onClick={deletePost}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full font-semibold hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      <i className="ri-delete-bin-line text-xl"></i>
                      Delete
                    </button>
                  )}
                  
                  {saved ? (
                    <button 
                      onClick={discardSavedPost}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-full font-semibold hover:from-gray-800 hover:to-gray-900 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      <i className="ri-bookmark-fill text-xl"></i>
                      Saved
                    </button>
                  ) : (
                    <button 
                      onClick={savedPost}
                      className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-red-500 text-red-500 rounded-full font-semibold hover:bg-red-50 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                      <i className="ri-bookmark-line text-xl"></i>
                      Save
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </> : <>
      <div className="h-screen opacity-70 flex justify-center items-center">
        <CircularProgress style={{ color: 'black' }} />
      </div>
    </>
  )
}

export default PinsData