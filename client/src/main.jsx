import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './store/auth.jsx'
import { BrowserRouter } from 'react-router-dom';
import { Analytics } from "@vercel/analytics/react"

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
        <React.StrictMode>
            <BrowserRouter>
                <App />
                <Analytics/>
            </BrowserRouter>
        </React.StrictMode>
    </AuthProvider>
)
