import axios from 'axios';

export const authorizeUser = () => {
    const clientId = import.meta.env.VITE_LATAM_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_LATAM_REDIRECT_URI;
    const responseType = 'code'; // conforme solicitado na documentação
    const scope = 'member-show-name redeem-create'; // os escopos que você precisa
    const state = 'unique_state_value'; // um valor único para evitar CSRF, pode ser gerado dinamicamente

    const url = `${import.meta.env.VITE_LATAM_API_BASE_URL}/oauth/authorize?response_type=${responseType}&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}&state=${state}`;
    
    window.location.href = url; // Redireciona o usuário para a URL de autorização
};

export const getAccessToken = async (authorizationCode) => {
    const data = {
        grant_type: 'authorization_code',
        code: authorizationCode,
        client_id: import.meta.env.VITE_LATAM_CLIENT_ID,
        client_secret: import.meta.env.VITE_LATAM_CLIENT_SECRET,
        redirect_uri: import.meta.env.VITE_LATAM_REDIRECT_URI,
    };

    try {
        const response = await axios.post(`${import.meta.env.VITE_LATAM_API_BASE_URL}/oauth/token`, data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        return response.data; // Retorna a resposta que contém o access_token e o refresh_token
    } catch (error) {
        console.error('Error getting access token:', error);
        throw error;
    }
};

export const getProtectedData = async () => {
    const accessToken = localStorage.getItem('latam_access_token');

    if (!accessToken) {
        throw new Error('Access token is missing');
    }

    try {
        const response = await axios.get(`${import.meta.env.VITE_LATAM_API_BASE_URL}/some/protected/endpoint`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching protected data:', error);
        throw error;
    }
};

export const getMemberInfo = async () => {
    const accessToken = localStorage.getItem('latam_access_token');

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
        console.error('Error fetching member info:', error);
        throw error;
    }
};

export const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('latam_refresh_token');

    if (!refreshToken) {
        throw new Error('Refresh token is missing');
    }

    const data = {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: import.meta.env.VITE_LATAM_CLIENT_ID,
        client_secret: import.meta.env.VITE_LATAM_CLIENT_SECRET,
    };

    try {
        const response = await axios.post(`${import.meta.env.VITE_LATAM_API_BASE_URL}/oauth2/token`, data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        // Armazena o novo access token e o refresh token no localStorage
        localStorage.setItem('latam_access_token', response.data.access_token);
        localStorage.setItem('latam_refresh_token', response.data.refresh_token);

        return response.data.access_token;
    } catch (error) {
        console.error('Error refreshing access token:', error);
        throw error;
    }
};

export const getPrograms = async () => {
    const accessToken = localStorage.getItem('latam_access_token');

    if (!accessToken) {
        throw new Error('Access token is missing');
    }

    try {
        const response = await axios.get(`${import.meta.env.VITE_LATAM_API_BASE_URL}/programs`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching programs:', error);
        throw error;
    }
};

export const getProgramsForMember = async (memberId) => {
    const accessToken = localStorage.getItem('latam_access_token');

    if (!accessToken) {
        throw new Error('Access token is missing');
    }

    try {
        const response = await axios.get(`${import.meta.env.VITE_LATAM_API_BASE_URL}/programs`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
            params: {
                'member-id': memberId
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching programs for member:', error);
        throw error;
    }
};





