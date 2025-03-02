import React, { useState, useEffect } from "react";
import "../scss/styles/header.scss";
import { Link,useNavigate } from "react-router-dom";
import { User } from "../context/DataContext";
const Header = () => {
  const [userParsed, setUserParsed] = useState<User | null>(null);
  useEffect(() => {
    const userInfo = localStorage.getItem('userData');
    if (userInfo) {
      const parsedData: User = JSON.parse(userInfo);
      setUserParsed(parsedData); 
    }
  }, []); 
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('userData');
    alert('You have been logged out!');
    navigate('/login', { replace: true });
    window.location.reload();
  };


  return (
    <header className="headerMain">
      <div className="container">
        <Link  className='link' to={'/'}> <p className='logo'>PROTASKER</p>  </Link>
        <nav className="nav1">
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Features</a></li>
            <li><a href="#">Pricing</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </nav>
        <div className="auth-buttons">
          {
          userParsed ?
          (<>
            <Link className="link" to={'/login'}><button className="login">{userParsed.first_name}</button></Link>
          </>):(
           <>
           <Link className="link" to={'/login'}><button className="login">Login</button></Link> 
           </>
          )
          }
            {
          userParsed ?
          (<>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </>):(
           <>
            <Link className="link" to={'/register'}><button className="register">Register</button></Link>
           </>
          )
          }
       
          
        </div>
      </div>
    </header>
  );
};

export default Header;
