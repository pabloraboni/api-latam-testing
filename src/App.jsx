import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import OAuthCallback from './OAuthCallback';
import ProgramList from './ProgramList';
import MemberPrograms from './MemberPrograms';
import ProtectedDataComponent from './ProtectedDataComponent';
import { authorizeUser } from './api';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/oauth/callback" element={<OAuthCallback />} />
                <Route path="/protected-data" element={<ProtectedDataComponent />} />
                <Route path="/program-list" element={<ProgramList />} />
                <Route path="/member-programs" element={<MemberPrograms />} />
            </Routes>
        </Router>
    );
}

function Home() {
    return (
        <div className="App">
            <h1>Teste de Integração com a API LATAM Pass</h1>
            <button onClick={authorizeUser}>Autorizar LATAM Pass</button>
        </div>
    );
}

export default App;