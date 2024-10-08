import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Profile from './components/Profile';
import AdminDashboardPage from './components/AdminDashboardPage';
import HomePage from './components/HomePage';
import AddProduct from './components/AddProduct';
import Users from './components/Users';
import ProductTable from './components/ProductTable';
import Wishlist from './components/Wishlist';
import DetailPage from './components/DetailPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<HomePage />} />
                <Route exact path="/login" element={<LoginPage />} />
                <Route exact path="/user/profile" element={<Profile />} />
                <Route exact path='/user/wishlist' element={<Wishlist />} />
                <Route exact path='/product/detail/:id/:name' element={<DetailPage />} />
                <Route exact path="/dashboard" element={<AdminDashboardPage />} />
                <Route exact path="/dashboard/users" element={<Users />} />
                <Route exact path="/dashboard/products" element={<ProductTable />} />
                <Route exact path="/dashboard/add_product" element={<AddProduct />} />
            </Routes>
        </Router>
    );
}

export default App;
