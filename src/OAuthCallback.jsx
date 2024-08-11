import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getAccessToken } from './api';

function OAuthCallback() {
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const authorizationCode = params.get('code');

        if (authorizationCode) {
            console.log('Authorization Code:', authorizationCode);

            // Troca o código de autorização pelo token de acesso
            getAccessToken(authorizationCode)
                .then(data => {
                    console.log('Access Token:', data.access_token);

                    // Armazena o access token e o refresh token no localStorage
                    localStorage.setItem('latam_access_token', data.access_token);
                    localStorage.setItem('latam_refresh_token', data.refresh_token);

                    // Agora você pode redirecionar o usuário para a página inicial ou outra página
                })
                .catch(err => {
                    console.error('Failed to get access token:', err);
                });
        } else {
            console.error('Authorization failed or was denied.');
        }
    }, [location]);

    return (
        <div>
            <h2>Processando a autorização...</h2>
        </div>
    );
}

export default OAuthCallback;
