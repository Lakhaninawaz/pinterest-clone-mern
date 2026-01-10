import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPublicUserProfile } from "../../api";
import { CircularProgress } from '@mui/material';

const PublicProfile = () => {
    const { username } = useParams();
    const [loading, setLoading] = useState(true);
    const [profileUser, setProfileUser] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true);
            try {
                const response = await getPublicUserProfile(username);
                if (response.status === 200) {
                    setProfileUser(response.data.user);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [username]);

    if (loading) {
        return (
            <div className="h-screen opacity-70 flex justify-center items-center">
                <CircularProgress style={{ color: 'black' }} />
            </div>
        );
    }

    if (!profileUser) {
        return (
            <div className="h-screen flex items-center justify-center">
                <h1 className="text-2xl">User not found</h1>
            </div>
        );
    }

    return (
        <div className="profile w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-1">
            <div className="max-w-5xl mx-auto px-4 py-8">
                {/* Profile Header Card */}
                <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
                    <div className="flex flex-col items-center">
                        <div className="w-32 h-32 rounded-full ring-4 ring-red-100 overflow-hidden">
                            {profileUser.profileImage ? (
                                <img 
                                    className="w-full h-full object-cover" 
                                    src={profileUser.profileImage} 
                                    alt={profileUser.name} 
                                />
                            ) : (
                                <div className="bg-gradient-to-br from-red-400 to-red-600 text-5xl text-white flex items-center justify-center w-full h-full">
                                    {profileUser.name.charAt(0).toUpperCase()}
                                </div>
                            )}
                        </div>
                        <h1 className="text-4xl font-bold text-gray-900 mt-6">{profileUser.name}</h1>
                        <h3 className="text-lg text-gray-500 mt-1">@{profileUser.username}</h3>
                    </div>
                </div>

                {/* Pins Section */}
                <div className="mb-4">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                        {profileUser.posts?.length > 0 ? `Pins (${profileUser.posts.length})` : 'No pins yet'}
                    </h2>
                </div>

                {profileUser.posts?.length > 0 && (
                    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                        {profileUser.posts.map((post, i) => (
                            <Link key={i} to={`/posts/${post._id}`}>
                                <div className="card break-inside-avoid mb-6 group cursor-pointer transform transition-all duration-300 hover:scale-[1.02]">
                                    <div className="relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300">
                                        <img 
                                            className="w-full h-auto object-cover" 
                                            src={post.image} 
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
                )}
            </div>
        </div>
    );
};

export default PublicProfile;
