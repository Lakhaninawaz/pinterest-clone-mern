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
    const [refreshing, setRefreshing] = useState(false);

    const { user, userPosts, refreshUser } = useAuth()
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const [savedPost, setSavedPost] = useState();


    const handleOpenModal1 = () => setIsOpen(1);
    const handleOpenModal2 = () => setIsOpen(2);
    const handleCloseModal = () => {
        // Close modal without clearing user to avoid loading flicker
        setIsOpen(0);
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

    const handlePostCreated = async () => {
        setRefreshing(true);
        try {
            await refreshUser();
        } finally {
            setRefreshing(false);
        }
    };

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
                    <div className="relative w-[92%] max-w-xl bg-white rounded-3xl shadow-2xl p-6">
                        {/* Floating close button in container */}
                        <button onClick={handleCloseModal} aria-label="Close" className="absolute -top-3 -right-3 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 shadow-md">
                            <i className="ri-close-line text-gray-700"></i>
                        </button>
                        <CreatePostPopup convert={convertToBase64} onClose={handleCloseModal} onCreated={handlePostCreated} />
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
                    <div className="relative w-[92%] max-w-md bg-white rounded-3xl shadow-2xl p-6">
                        {/* Floating close button in container */}
                        <button onClick={handleCloseModal} aria-label="Close" className="absolute -top-3 -right-3 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 shadow-md">
                            <i className="ri-close-line text-gray-700"></i>
                        </button>
                        <EditProfilePopup onClose={handleCloseModal} />
                    </div>
                </Modal>
            }
            {user && savedPost ?
                <>
                    <div className="profile w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-1">
                        <form hidden onChange={handleSubmit}>
                            <input ref={fileInputRef} type="file" name="profileImage" encType="multipart/form-data" accept=".jpg,.jpeg,.png" />
                        </form>
                        
                        <div className="max-w-5xl mx-auto px-4 py-8">
                            {/* Profile Header Card */}
                            <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
                                <div className="flex flex-col items-center">
                                    <div className="relative group">
                                        <div onClick={handleUploadClick} className="cursor-pointer">
                                            {!loading ? (
                                                <div className="w-32 h-32 rounded-full ring-4 ring-red-100 overflow-hidden">
                                                    {imageUrl !== '' ? (
                                                        <img className="w-full h-full object-cover" name="profileImg" src={imageUrl} alt="" />
                                                    ) : (
                                                        <div className="bg-gradient-to-br from-red-400 to-red-600 text-5xl text-white flex items-center justify-center w-full h-full">
                                                            {user.name.charAt().toUpperCase()}
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <div className="w-32 h-32 bg-zinc-200 rounded-full flex items-center justify-center">
                                                    <CircularProgress style={{ color: '#ef4444' }} />
                                                </div>
                                            )}
                                            <div className="absolute bottom-2 right-2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:bg-red-50 transition-colors border-2 border-gray-100">
                                                <i className="text-red-500 ri-pencil-fill"></i>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <h1 className="text-4xl font-bold text-gray-900 mt-6">{user.name}</h1>
                                    <h3 className="text-lg text-gray-500 mt-1">@{user.username}</h3>
                                    
                                    <div className="flex gap-3 mt-6">
                                        <button 
                                            onClick={handleOpenModal2} 
                                            className="px-8 py-3 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-semibold text-gray-700 transition-colors shadow-md hover:shadow-lg"
                                        >
                                            <i className="ri-edit-line mr-2"></i>
                                            Edit Profile
                                        </button>
                                        <button 
                                            onClick={handleOpenModal1} 
                                            className="px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                                        >
                                            <i className="ri-add-line mr-2"></i>
                                            Create Pin
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Collections Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {userPosts?.length > 0 && (
                                    <Link to={"/createdPins"}>
                                        <div className="group cursor-pointer transform transition-all duration-300 hover:scale-105">
                                            <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl overflow-hidden transition-shadow">
                                                <div className="relative h-48 overflow-hidden">
                                                    <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={`${userPosts[0].image}`} alt="" />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                                    <div className="absolute bottom-4 left-4">
                                                        <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                                            {userPosts.length} Pins
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="p-5">
                                                    <h3 className="text-xl font-bold text-gray-900 mb-1">Your Uploaded Pins</h3>
                                                    <p className="text-sm text-gray-500">Your creative collection</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                )}
                                {savedPost?.length > 0 && (
                                    <Link to={"/savedPins"}>
                                        <div className="group cursor-pointer transform transition-all duration-300 hover:scale-105">
                                            <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl overflow-hidden transition-shadow">
                                                <div className="relative h-48 overflow-hidden">
                                                    <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={`${savedPost[0].image}`} alt="" />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                                    <div className="absolute bottom-4 left-4">
                                                        <div className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                                            {savedPost.length} Pins
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="p-5">
                                                    <h3 className="text-xl font-bold text-gray-900 mb-1">Saved Pins</h3>
                                                    <p className="text-sm text-gray-500">Your saved inspiration</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                )}
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

            {/* show a small spinner above the pins grid when refreshing */}
            {refreshing && (
                <div className="w-full flex justify-center items-center py-3">
                    <CircularProgress style={{ color: '#ef4444' }} />
                </div>
            )}

            {/* your pins grid below */}
        </>

    )
}

export default Profile