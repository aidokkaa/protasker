import React, { FormEvent, ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import '../scss/styles/registration.scss';

const RegisterPage = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    gender: '',
  });

  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
    setSuccessMessage('');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user.firstName.trim() || !user.lastName.trim() || !user.email.trim() || !user.password.trim() || !user.gender.trim()) {
      setError('All fields are required!');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!res.ok) {
        throw new Error('Register failed! Try again.');
      }

      const data = await res.json();
      setSuccessMessage('Registration successful! You can now log in.');
      setUser({ firstName: '', lastName: '', email: '', password: '', gender: '' }); 
    } catch (error) {
      setError('Registration failed! Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <form onSubmit={handleSubmit}>
      <h1>PROTASKER</h1>
      <h2 style={{color:"gray"}}>To get started, please sign up</h2>

        {error && <p className="error">{error}</p>}
        {successMessage && <p className="success">{successMessage}</p>}

        <input onChange={handleChange} type="text" placeholder="First Name" value={user.firstName} name="firstName" required />
        <input onChange={handleChange} type="text" placeholder="Last Name" value={user.lastName} name="lastName" required />
        <input onChange={handleChange} type="text" placeholder="Gender" value={user.gender} name="gender" required />
        <input onChange={handleChange} type="email" name="email" value={user.email} placeholder="Email" required />
        <input onChange={handleChange} type="password" name="password" value={user.password} placeholder="Password" required />

        <button type="submit" disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>

        <div className="log-in">
          <span>Already have an account?</span>
          <span><Link to="/login">Log in</Link></span>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
