import { useEffect, useState } from 'react';
import { getProtectedData } from './api';

function ProtectedDataComponent() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        getProtectedData()
            .then(data => setData(data))
            .catch(error => setError('Failed to fetch protected data.'));
    }, []);

    return (
        <div>
            <h1>Dados Protegidos</h1>
            {error ? <p>{error}</p> : data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Carregando...</p>}
        </div>
    );
}

export default ProtectedDataComponent;
