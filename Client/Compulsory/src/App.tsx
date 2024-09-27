import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SignUp from './components/SignUP';
import Login from './components/Login';
import Dashboard from './components/DashBoard';
import PaperList from './components/paperList';
import ManageProducts from './components/ManageProducts';


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/manage-products" element={<ManageProducts />} />
        <Route path="/paper" element={<PaperList />} />
      </Routes>
    </Router>
  );
};

export default App;

