import { useNavigate, useParams } from "react-router-dom"
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
      // console.log(user.boards?.includes(id) ? true : false);
      // setSaved(user.boards?.includes(id) ? true : false)
      postData();
    } else {
      // setSaved(user.boards?.includes(id) ? true : false)
      setLoading(false)
    }
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
      {/* <div className="p-4 bg-white rounded-lg shadow-md">
      <a href={`/post/${post._id}`}> {/* Link to full post details

      </a>
      <div className="p-4 flex flex-col space-y-2">
        
        </div>
      </div>
    </div> */}
      <div className="flex flex-col md:flex-row h-full items-center justify-center">
        <div className=" px-10 left w-full h-[60vmax] md:h-[90vh] md:w-[50vw] flex items-center justify-center bg-gray-500">
          <img
            src={`${post.image}`} // Assuming image path format
            alt={post.title}
            className="object-cover rounded-2xl"
          />
        </div>
        <div className="right px-5 w-full md:w-[50vw] h-full pt-5 text-start  ">
          <h1 className="text-[3vmax] font-medium text-gray-900">Title : <span className="hover:underline">{post.title}</span></h1>
          <p className="text-gray-600 text-lg"><span className="font-medium">Description:</span> {post.description}</p>
          <p className="text-gray-600 text-lg mb-3"><span className="font-medium">By:</span> {post.user.username} {post.user.username === user?.username ? "(you)" : ""} </p>
          {
            post.user?.username === user?.username &&         
          <i onClick={deletePost} className="cursor-pointer text-xl ri-delete-bin-line"></i>
}
{/* {console.log(saved)} */}
{
  saved ? 
  <i onClick={discardSavedPost} className="cursor-pointer ml-1 ri-bookmark-fill"></i>:
  <i onClick={savedPost} className="cursor-pointer ml-1 ri-bookmark-line"></i>
}
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