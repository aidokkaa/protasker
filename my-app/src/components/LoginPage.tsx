import React, { FormEvent, ChangeEvent, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../context/LoginContext';
import { Link } from 'react-router-dom';
import '../scss/styles/registration.scss';

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const context = useContext(LoginContext);
  if (!context) {
    throw new Error('LoginContext is not available.');
  }
  const { setUser, user } = context;

  useEffect(() => {
    const storedUser = localStorage.getItem('userData');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      const role = parsedUser.role;
      navigate(
        role === 'admin'
          ? '/admin'
          : role === 'manager'
          ? '/manager'
          : '/emp'
      );
    }
  }, [navigate]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    setError('');
    setSuccessMessage('');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userData.email.trim() || !userData.password.trim()) {
      setError('All fields are required!');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(userData),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || 'Login failed! Invalid credentials.');
      }

      const data = await res.json();
      if (!data.user) {
        throw new Error('Invalid response from server.');
      }

      setUser(data.user);
      localStorage.setItem('userData', JSON.stringify(data.user));

      setSuccessMessage('Login successful! Redirecting...');
      
      navigate(
        data.user.role === 'admin'
          ? '/admin'
          : data.user.role === 'manager'
          ? '/manager'
          : '/emp'
      );
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Login failed! Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <form onSubmit={handleSubmit}>
        <h1>PROTASKER</h1>
        <h2 style={{color:"gray"}}>To get started, please sign in</h2>
        {error && <p className="error">{error}</p>}
        {successMessage && <p className="success">{successMessage}</p>}

        <input
          onChange={handleChange}
          type="email"
          name="email"
          value={userData.email}
          placeholder="Email"
          required
        />
        <input
          onChange={handleChange}
          type="password"
          name="password"
          value={userData.password}
          placeholder="Password"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <span>No account?</span>
        <Link to='/register'style={{textDecoration:"none",color:"black"}}>Register</Link>
      </form>
    </div>
  );
};

export default LoginPage;
