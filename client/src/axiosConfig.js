import axios from "axios";

const instance = axios.create({
    baseURL:  import.meta.env.REACT_APP_BASE_URL || "http://www.localhost:3000"
})

export default instance;