import axios from 'axios';
import { refreshAccessToken } from './api';

export const getMemberInfo = async () => {
    let accessToken = localStorage.getItem('latam_access_token');

    if (!accessToken) {
        throw new Error('Access token is missing');
    }

    try {
        const response = await axios.get(`${import.meta.env.VITE_LATAM_API_BASE_URL}/me`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            // Se receber um 401, o token pode ter expirado, tente renovar
            try {
                accessToken = await refreshAccessToken();
                const response = await axios.get(`${import.meta.env.VITE_LATAM_API_BASE_URL}/me`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });

                return response.data;
            } catch (refreshError) {
                console.error('Failed to refresh access token:', refreshError);
                throw refreshError;
            }
        } else {
            console.error('Error fetching member info:', error);
            throw error;
        }
    }
};
