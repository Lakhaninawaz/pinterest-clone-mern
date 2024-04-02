import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import 'remixicon/fonts/remixicon.css';
import { AuthProvider } from './store/auth.jsx';
import axios from 'axios';

const token = localStorage.getItem("token");

axios.defaults.baseURL = import.meta.env.REACT_APP_BASE_URL || "http://www.localhost:3000";
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

axios.interceptors.request.use(request => {
    console.log(request);
    // Edit request config
    return request;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

axios.interceptors.response.use(response => {
    console.log(response);
    // Edit response config
    return response;
}, error => {
    // console.log(error);
    return Promise.reject(error);
});

// Use ReactDOM.render instead of ReactDOM.createRoot
// eslint-disable-next-line react/no-deprecated
ReactDOM.render(
    <AuthProvider>
        <React.StrictMode>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </React.StrictMode>
    </AuthProvider>,
    document.getElementById('root')
);
