import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SignUp from './components/SignUP';
import Login from './components/Login';
import Dashboard from './components/DashBoard';
import PaperList from './components/paperList';
import ManageProducts from './components/ManageProducts';
import ProductList from './components/ShopSite';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import AdminOrderManagement from './components/OrderManagement';



const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Login />} />
        <Route path="/manage-products" element={<ManageProducts />} />
        <Route path="/paper" element={<PaperList />} />
        <Route path="/shopsite" element={<ProductList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/manage-orders" element={<AdminOrderManagement />} />
      </Routes>
    </Router>
  );
};

export default App;

