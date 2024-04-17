import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom"
import { changeProfileImage, getAllSavedPins } from "../../api";
import { CircularProgress } from '@mui/material'
import { useAuth } from "../../store/auth";
import CreatePostPopup from "../../components/CreatePostPopup";
import Modal from '@mui/material/Modal';
import EditProfilePopup from "../../components/EditProfilePopup";

const Profile = () => {

    const [isOpen, setIsOpen] = useState(0);


    const { user, userPosts, setUserNull } = useAuth()
    const [imageUrl, setImageUrl] = useState('');
    // console.log(user.profileImage);
    const [loading, setLoading] = useState(true);
    const [savedPost, setSavedPost] = useState();


    const handleOpenModal1 = () => setIsOpen(1);
    const handleOpenModal2 = () => setIsOpen(2);
    const handleCloseModal = () => {
        setIsOpen(0);
        setUserNull();
    }

    const fileInputRef = useRef(null);

    const handleUploadClick = () => {
        fileInputRef.current.click();
    }

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()

        const file = fileInputRef.current.files[0];
        const base64 = await convertToBase64(file);
        // console.log(base64);
        // console.log(file);
        if (file) {
            // console.log("File selected!");

            // console.log(file);

            const response = await changeProfileImage(base64);

            if (response.status !== 200) {
                setLoading(false)

                console.error('Error uploading image:', response.data.message);
            } else {
                // console.log(response.data.user.profileImage);
                setLoading(false)
                setImageUrl(`${response.data.user.profileImage}`); // Update image URL from response data
                // window.location.reload();
            }
        } else {
            alert("Please select a file before clicking Upload.");
        }
    }

    const getSavePosts = async () => {
        try {
            setLoading(true)
            const response = await getAllSavedPins();

            // console.log(response);
            setSavedPost(response);
            setLoading(false)

        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    useEffect(() => {
        if (user) {
            getSavePosts();
            setImageUrl('')
            setLoading(false);
        }
        if (user?.profileImage) {
            setImageUrl(`${user.profileImage}`)
        }
    }, [user])

    function convertToBase64(file) {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => resolve(fileReader.result);
            fileReader.onerror = (err) => reject(err);
        })
    }

    if (loading) {
        return (
            <>
                <div className="h-screen opacity-70 flex justify-center items-center">
                    <CircularProgress style={{ color: 'black' }} />
                </div>
            </>
        )
    }

    return (
        <>
            {
                isOpen === 1 &&

                <Modal
                    onClose={() => handleCloseModal()}
                    open={isOpen === 1}
                    className="w-screen h-screen flex items-center justify-center bg-transparent"
                >
                    <div className="w-4/5 md:w-3/5 p-10 h-3/4 bg-[#ffffff70]">
                        <CreatePostPopup convert={convertToBase64} onClose={handleCloseModal} />
                    </div>
                </Modal>
            }
            {
                isOpen === 2 &&

                <Modal
                    onClose={() => handleCloseModal()}
                    open={isOpen === 2}
                    className="w-screen h-screen flex items-center justify-center bg-transparent"
                >
                    <div className="w-4/5 sm:w-3/5 md:w-2/5 p-7 h-3/5 bg-[#ffffff70]">
                        <EditProfilePopup onClose={handleCloseModal} />
                    </div>
                </Modal>
            }
            {user && savedPost ?
                <>
                    <div className="profile w-full min-h-screen bg-white pt-1">
                        <form hidden onChange={handleSubmit}>
                            <input ref={fileInputRef} type="file" name="profileImage" encType="multipart/form-data" accept=".jpg,.jpeg,.png" />
                        </form>
                        <div className="profdets flex flex-col items-center justify-center mt-10">
                            <div className="relative">
                                <span onClick={handleUploadClick} className="w-10 h-10 absolute bottom-0 right-0 rounded-full flex items-center justify-center bg-slate-100">
                                    <i className="text-black ri-pencil-fill"></i>
                                </span>
                                {!loading ?
                                    <div className="w-32 h-32 bg-zinc-200 rounded-full">
                                        {imageUrl !== '' ?
                                            <img className="w-full h-full object-cover rounded-full" name="profileImg" src={imageUrl} alt="" /> : <h1 className="bg-red-500 text-4xl text-white flex items-center justify-center w-full h-full rounded-full">{user.name.charAt().toUpperCase()}</h1>
                                        }
                                    </div> :
                                    <div className="w-32 h-32 bg-zinc-200 rounded-full flex items-center justify-center">
                                        <CircularProgress style={{ color: 'black' }} />
                                    </div>
                                }
                            </div>
                            <h1 className="text-3xl font-semibold">{user.name}</h1>
                            <h3 className="text-md">@{user.username}</h3>
                            <button onClick={handleOpenModal2} className="px-7 py-2 mt-2 bg-gray-200 rounded-full text-sm font-semibold">Edit</button>
                            <button onClick={handleOpenModal1} className="text-white px-7 py-2 mt-2 bg-red-500 rounded-lg text-sm font-semibold ">Add New Post</button>
                        </div>
                        <div className="cards flex flex-wrap items-center justify-center md:items-start md:justify-start gap-10 px-10 mt-10">
                            {/* {console.log(userPosts)} */}
                            {userPosts?.length > 0 &&
                                <Link to={"/createdPins"}>
                                    <div className="card cursor-pointer">
                                        <div className="w-52 h-40 bg-gray-100 rounded-lg overflow-hidden">
                                            <img className="w-full h-full object-cover" src={`${userPosts[0].image}`} alt="" />
                                        </div>
                                        {/* after:transition after:duration-400 after:ease-out after:transform after:h-[2px] after:w-full after:bg-black after:absolute after:-bottom-1 after:right-0 after:scale-x-0 hover:after:scale-x-100 after:origin-left */}
                                        <h3 className="text-xl font-semibold mt-3 cursor-pointer">Your Uploaded Pins</h3>
                                        <h5 className="text-sm font-medium opacity-60">{userPosts.length} Pins</h5>
                                    </div>
                                </Link>
                            }
                            {savedPost?.length > 0 &&
                                <Link to={"/savedPins"}>
                                    <div className="card cursor-pointer">
                                        <div className="w-52 h-40 bg-gray-100 rounded-lg overflow-hidden">
                                            <img className="w-full h-full object-cover" src={`${savedPost[0].image}`} alt="" />
                                        </div>
                                        {/* after:transition after:duration-400 after:ease-out after:transform after:h-[2px] after:w-full after:bg-black after:absolute after:-bottom-1 after:right-0 after:scale-x-0 hover:after:scale-x-100 after:origin-left */}
                                        <h3 className="text-xl font-semibold mt-3 cursor-pointer">All Saved Pins</h3>
                                        <h5 className="text-sm font-medium opacity-60">{savedPost.length} Pins</h5>
                                    </div>
                                </Link>
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

export default Profile