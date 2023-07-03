import React, { createContext, useState } from 'react';
import './App.css';
import axiosInstance from './axios';

const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({children}) => {

// export default function Login() {
  
    /* const [formData, setFormData] = useState({
        username: '',
        password: '' 
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        });
    }; */

    // login
    const login = (e) => {
        e.preventDefault();
        
        axiosInstance.post('/api/token/', {
            // username: formData.username,
            // password: formData.password
            username: e.target.username.value,
            password: e.target.password.value 
        })
        .then((response) => {
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            axiosInstance.defaults.headers['Authorization'] =
                'JWT ' + localStorage.getItem('access_token');
            console.log(response);
            window.location.href = '/';
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

    return (
        <>
            {/* <div className="container">
                <form onSubmit={login}>
                    <input type="text" name="username" onChange={handleChange}/>
                    <input type="password" name="password" onChange={handleChange}/>
                    <input type="submit" value="Login" />
                </form>
                <button onClick={logout}>Logout</button>
            </div>  */}
            <AuthContext.Provider value={{login, logout}}>
                {children}
            </AuthContext.Provider>
        </>
    );
}

