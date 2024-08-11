import { useState } from 'react';
import { getProgramsForMember } from './api';

function MemberPrograms() {
    const [memberId, setMemberId] = useState('');
    const [programs, setPrograms] = useState([]);
    const [error, setError] = useState(null);

    const handleSearch = () => {
        if (memberId) {
            getProgramsForMember(memberId)
                .then(data => setPrograms(data))
                .catch(error => setError('Failed to fetch programs for the member.'));
        }
    };

    return (
        <div>
            <h1>Pesquisar Programas para Membro</h1>
            <input
                type="text"
                value={memberId}
                onChange={(e) => setMemberId(e.target.value)}
                placeholder="Insira o ID do Membro"
            />
            <button onClick={handleSearch}>Pesquisar</button>

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
                <p>Insira o ID do membro e clique em pesquisar para ver os programas.</p>
            )}
        </div>
    );
}

export default MemberPrograms;
