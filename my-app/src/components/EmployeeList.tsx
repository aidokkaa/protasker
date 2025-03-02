import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../scss/styles/employyeList.scss';
import { User } from '../context/DataContext';

const EmployyeList = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {      
        const res = await fetch('http://localhost:5000/api/users', {
          method: 'GET',
          credentials: 'include',
        });

        if (res.status === 403) {
          throw new Error('Access denied. Redirecting to login...');
        }
  
        if (!res.ok) {
          throw new Error(`Error ${res.status}: ${res.statusText}`);
        }
  
        const data = await res.json();
        if (data.success && Array.isArray(data.data)) {
          setUsers(data.data); 
        } else {
          throw new Error('Unexpected response format');
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
          if (err.message.includes('Access denied')) {
            navigate('/login');
          }
        }
      } finally {
        setLoading(false);
      }
    };
  
    fetchUsers();
  }, [navigate]);
  
  const filteredUsers = users.filter(user => user.role === 'user');

  const handleLogout = () => {
    localStorage.removeItem('userData');
    alert('You have been logged out!');
    navigate('/login', { replace: true });
    window.location.reload();
  };

  return (
    <div>
      <div className="navTop">
       <Link  className='link' to={'/'}> <p className='logo'>PROTASKER</p>  </Link>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      <div className="eListContainer">
        <div className="eListNav">
          <img src="https://st2.depositphotos.com/4520249/7099/v/450/depositphotos_70995599-stock-illustration-users-agents-clients-icon.jpg" alt="IMG" />
            <a href='/assign-task'><div className="assignT">  <h2>Assign task</h2>
            </div></a>
           
          <div className="menunav">
            <Link to="#">Main</Link>
            <a className='link' href='/taskslistpage'><p className='link'> Tasks</p></a>
            <Link to="#">Calendar</Link>
          </div>   
        </div>

        <div className="eListmain">
          <h1>Employees Management</h1>

          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : filteredUsers.length === 0 ? (
            <p>No employees found.</p>
          ) : (
            <div className="listEmployyes">
              <table>
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Gender</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map(item => (
                    <tr key={item.id}>
                      <td>{item.first_name}</td>
                      <td>{item.last_name}</td>
                      <td>{item.gender}</td>
                      <td>{item.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployyeList;
