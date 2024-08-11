import { useEffect, useState } from 'react';
import { getPrograms } from './api';

function ProgramList() {
    const [programs, setPrograms] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        getPrograms()
            .then(data => setPrograms(data))
            .catch(error => setError('Failed to fetch programs.'));
    }, []);

    return (
        <div>
            <h1>Lista de Programas</h1>
            {error ? (
                <p>{error}</p>
            ) : programs.length > 0 ? (
                <ul>
                    {programs.map(program => (
                        <li key={program.id}>
                            {program.name} (ID: {program.id})
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Carregando...</p>
            )}
        </div>
    );
}

export default ProgramList;
