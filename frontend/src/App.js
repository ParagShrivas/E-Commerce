import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import AdminDashboardPage from './components/AdminDashboardPage';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/dashboard" element={<AdminDashboardPage />} />
            </Routes>
        </Router>
    );
}

export default App;
