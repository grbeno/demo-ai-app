import React, { createContext } from 'react';
import './App.css';
import axiosInstance from './axios';
import jwt_decode from "jwt-decode";

const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({children}) => {

    // login
    const login = (e) => {
        e.preventDefault();
        
        axiosInstance.post('/api/token/', {
            username: e.target.username.value,
            password: e.target.password.value 
        })
        .then((response) => {
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            axiosInstance.defaults.headers['Authorization'] =
                'JWT ' + localStorage.getItem('access_token');
            // console.log(response);
            // window.location.reload();  // localhost:3000
            window.location.href = '/';  // localhost:8000
        }).catch((error) => {
            console.log(error);
        });
    };

    // logout
    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        axiosInstance.defaults.headers['Authorization'] = null;
        window.location.reload();
    };

    // check if access token is expired
    const isAccessTokenExpired = () => {
        
        const token = localStorage.getItem('access_token');
        
        try {
            const decodedToken = jwt_decode(token);
            const currentTime = Date.now() / 1000; // Convert to seconds
            if (decodedToken.exp < currentTime) {
                logout();
                return true;
            }; // Compare expiration time
        } catch (error) {
          console.error('Error decoding access token:', error);
          return true;
        }
    }

    const contextData = {login, logout, isAccessTokenExpired};
      
    return (
        <>
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
        </>
    );
}

