import axios from 'axios'

export const setAuthToken = (token) =>{
    if(token){
        console.log(token);
        axios.defaults.headers.common["Authorization"] = token
    }
    else{
        delete axios.defaults.headers.common["Authorization"];
    }
}

export const baseURL = import.meta.env.VITE_API_KEY

export * from "./users";