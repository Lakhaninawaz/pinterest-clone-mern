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

export const baseURL = import.meta.env.REACT_APP_BASE_URL || "http://www.localhost:3000";

export * from "./users";