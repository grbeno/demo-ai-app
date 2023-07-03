import axios from 'axios';


const baseURL = 'http://localhost:8000';

const axiosInstance = axios.create({
	baseURL: baseURL,
	timeout: 5000,
	headers: {
		Authorization: localStorage.getItem('access_token')
			? 'JWT ' + localStorage.getItem('access_token')
			: null,
		'Content-Type': 'application/json',
		'Accept': 'application/json',
	}, 
});

// refresh token
/* axiosInstance.interceptors.response.use(
    response => response,
    error => {
        const originalRequest = error.config;

        // Prevent infinite loops
        if (error.response.status === 401 && originalRequest.url === baseURL+'api/token/refresh/') {
            window.location.href = '/';
            return Promise.reject(error);
        }

        if (error.response.data.code === "token_not_valid" && error.response.status === 401 && error.response.statusText === "Unauthorized") {
            const refreshToken = localStorage.getItem('refresh_token');

            if (refreshToken) {
                const tokenParts = refreshToken.split(' ');
                const header = {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                };
                const body = {
                    refresh: tokenParts[1]
                };

                return axiosInstance.post('/api/token/refresh/', header, body)
                .then((response) => {
                    localStorage.setItem('access_token', response.data.access);
                    localStorage.setItem('refresh_token', response.data.refresh);

                    axiosInstance.defaults.headers['Authorization'] = 
                        'JWT ' + response.data.access;
                    originalRequest.headers['Authorization'] = 
                        'JWT ' + response.data.access;

                    return axiosInstance(originalRequest);
                })
                .catch(err => {
                    console.log(err);
                });
            }
            else {
                console.log("Refresh token not available.");
                window.location.href = '/';
            }
        }
}); */

export default axiosInstance;