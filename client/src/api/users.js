import axios from "../axiosConfig";
import Swal from "sweetalert2"

const token = localStorage.getItem('token')
// console.log(token);

export const signupUser = async (user) => {

    try {
        const response = await axios.post(`/users/signup`, {
            username: user.username,
            email: user.email,
            contact: user.contact,
            password: user.password,
        });

        Swal.fire({
            icon: "success",
            text: response.data.message,
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

        // console.log(response);
        return response;
    } catch (err) {
        console.log("signup error", err);
        return (err?.response || "Sign up failed!");
    }

}

export const signIn = async (user) => {
    try {
        const response = await axios.post(`/users/login`, {
            email: user.email,
            password: user.password
        })

        // console.log(response);

        Swal.fire({
            icon: "success",
            text: response.data.message,
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

        return response;

    } catch (error) {
        // console.log("login error", error);
        return (error?.response || "Login Failed")
    }
}

export const logOut = async () => {
    try {
        // console.log(token);
        const response = await axios.get(`/users/logout`,
            {
                headers: { Authorization: `${token}` }
            }
        );

        // console.log(response);

        Swal.fire({
            icon: "success",
            text: response.data.message,
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

        return response
    } catch (error) {
        console.log(error);
        return (error?.response)
    }
}

export const changeProfileImage = async (base64) => {
    const token = localStorage.getItem("token")

    // let formData = new FormData();
    // formData.append('profileImage', file);
    // console.log(formData);
    // console.log({base64});
    try {

        const response = await axios.post(`/users/fileupload`, {base64} , {
            headers: { Authorization: token },
        });

        Swal.fire({
            icon: "success",
            text: response.data.message,
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

        return response
    } catch (error) {
        console.log("Change Profile error", error);
        return (error?.response || "Sign up failed!");
    }
}

export const getCurrentUser = async () => {
    try {
        const token = localStorage.getItem('token')
        // console.log(token);
        //here i get current user data if status code is 40x so axios not show in browser console
        const response = await axios.get(`/users/userdata`, {
            headers: { Authorization: token }
        });
        // console.log(response);

        // if (response.status === 200){
            return response
    // } else{
    //     return response
    // }
    } catch (error) {
        console.log(error);
        return (error)
    }
}

export const getUserPosts = async () => {
    try {
        //here i get current user data if status code is 40x so axios not show in browser console
        const response = await axios.get(`/users/getPosts`, {
            headers: { Authorization: token }
        });
        if (response)
            return response
    } catch (error) {
        // console.log(error);
        return (error)
    }
}

export const getAllSavedPins = async () => {
    const token = localStorage.getItem("token")
    try {
        //here i get current user data if status code is 40x so axios not show in browser console
        const response = await axios.get(`/users/getSavedPosts`, {
            headers: { Authorization: token }
        });
        // console.log(response);
        if (response)
            return response.data.boards
    } catch (error) {
        // console.log(error);
        return (error)
    }
}

export const getAllPosts = async () => {
    const token = localStorage.getItem("token");
    
    try {
        //here i get current user data if status code is 40x so axios not show in browser console
        const response = await axios.get(`/users/getAllPosts`, {
            headers: { Authorization: token }
        });
        if (response)
            return response
    } catch (error) {
        // console.log(error);
        return (error)
    }
}

export const getPostData = async (id) => {
    const token = localStorage.getItem("token")

    try {
        //here i get current user data if status code is 40x so axios not show in browser console
        const response = await axios.get(`/users/getPost/${id}`, {
            headers: { Authorization: token }
        });
        if (response)
            return response
    } catch (error) {
        // console.log(error);
        return (error)
    }
}

export const deletePostById = async (id) => {
    // console.log(id);
    try {
        //here i get current user data if status code is 40x so axios not show in browser console
        const response = await axios.delete(`/users/deletePost/${id}`, {
            headers: { Authorization: token }
        });
        if (response){
            Swal.fire({
                icon: "success",
                text: response.data.message,
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
            
            return response
        }
    } catch (error) {
        // console.log(error);
        return (error)
    }
}

export const savePost = async (id) => {
    const token = localStorage.getItem("token");

    try {
        const response = await axios.post(`/users/savePost`, { id }, {
            headers: { Authorization: token }
        });

        Swal.fire({
            icon: "success",
            text: response.data.message,
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

        // console.log(response);
        return response;
    } catch (err) {
        // console.log("edit Profile error", err);
        return (err?.response || "Sign up failed!");
    }

}

export const deSavedPost = async (id) => {
    const token = localStorage.getItem('token')

    try {
        const response = await axios.post(`/users/deSavePost`, { id }, {
            headers: { Authorization: token }
        });

        Swal.fire({
            icon: "success",
            text: response.data.message,
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

        // console.log(response);
        return response;
    } catch (err) {
        // console.log("edit Profile error", err);
        return (err?.response || "Sign up failed!");
    }

}

export const editProfile = async (user) => {

    try {
        const response = await axios.put(`/users/editProfile`, {
            username: user.username,
            name: user.name,
            contact: user.contact
        }, {
            headers: { Authorization: token }
        });

        Swal.fire({
            icon: "success",
            text: response.data.message,
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

        // console.log(response);
        return response;
    } catch (err) {
        // console.log("edit Profile error", err);
        return (err?.response || "Sign up failed!");
    }

}

export const createPost = async (data) => {
    try {
        const token = localStorage.getItem("token")
        // console.log(data);
        const response = await axios.post(`/users/createPost`, data, {
            headers: { Authorization: token }
        });

        Swal.fire({
            icon: "success",
            text: response.data.message,
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

        // console.log(response);

        return response;

    } catch (err) {
        console.log(err);
        return (err?.response || "post creation failed!");
    }

}