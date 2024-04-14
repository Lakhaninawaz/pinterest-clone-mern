import axios from "axios";

const instance = axios.create({
    baseURL:  "https://pintrest-clone-mern-03qh.onrender.com"
})

export default instance;