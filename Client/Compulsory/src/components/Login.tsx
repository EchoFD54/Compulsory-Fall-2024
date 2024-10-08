import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { Form, Link, useNavigate } from 'react-router-dom';
import { customerAtom } from '../atoms/state';
import '../styles/InitialScreen.css'
import logo from '../assets/Applogo.png'

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [customer, setCustomer] = useAtom(customerAtom);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://localhost:7246/api/customer/email/${email}`);
      if (response.ok) {
        const data = await response.json();
        setCustomer(data);
        navigate('/dashboard');  
      } else {
        alert('Customer not found');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    
    <div className="login-signup-container">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="login-logo" />
      </div>

    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <button type="submit">Login</button>
      <div>
        <Link to="/signup">
          <button>Create Account</button>
        </Link>
      </div>
    </form>
    </div>
  );
};

export default Login;
