import React, { useContext, useEffect } from "react";
import { useNavigate,Link } from "react-router-dom";
import "../scss/styles/employyes.scss";
import EmployeeCalendar from "./Calendar";
import { LoginContext } from "../context/LoginContext";

const EmployysPage = () => {
  const context = useContext(LoginContext);

  if (!context) {
    throw new Error("EmployysPage context not working");
  }
 const navigate = useNavigate()
 const handleLogout = () => {
  localStorage.removeItem('userData');
  alert('You have been logged out!');
  navigate('/login', { replace: true }); 
  window.location.reload(); 
};
  const { user, setUser } = context;

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.id) return;

      try {
        const response = await fetch(`http://localhost:5000/api/users/${user.id}`, {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const result = await response.json();
        setUser(result); 
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    if (!user?.id) {
      const savedUser = localStorage.getItem("userData");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        fetchUserData();
      }
    }
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>  
        <div className="navTop">
     <Link  className='link' to={'/'}> <p className='logo'>PROTASKER</p>  </Link>
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
      <div className="mainEmployye">
      <div className="userImg">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-SnDtnoTbs_JJtNW62ALeA4gKPtpCGcQ5CnVEJNNAddxjuLwrbo1c16rExrxYL4xLmIw&usqp=CAU" alt="" />
          </div>
          <div className="mainUserInfo">
          <div className="userInfo">
            <div className="info1">
              <span>User ID: <span style={{fontWeight:"lighter"}}>{user.id}</span></span>
              <span>First name: <span style={{fontWeight:"lighter"}}>{user.first_name}</span></span>
              <span>Last Name: <span style={{fontWeight:"lighter"}}> {user.last_name}</span> </span>
              <span>Gender: <span style={{fontWeight:"lighter"}}> {user.gender}</span></span>
            </div>
            <div className="info2">
              <span>Email: <span style={{fontWeight:"lighter"}}>{user.email}</span></span>
              <span>Role: <span style={{fontWeight:"lighter"}}>{user.role}</span></span>
            </div>
            <div className="info3">
              <span>Phone number: <span style={{fontWeight:"lighter"}}> 8978734898</span></span>
              <span>Call to employee</span>
            </div>
          </div>
          <div className="workSchedule">
            <h3>Work Schedule</h3>
            <ul>
              <li>Monday - Friday: 9:00 AM - 5:00 PM</li>
              <li>Saturday: 10:00 AM - 3:00 PM</li>
              <li>Sunday: Off</li>
            </ul>
          </div>
          </div>
         </div>     
 
      
        <div className="main">
          <section className="weeklyTasks">
            <h2 style={{textAlign:"center"}}>Weekly Tasks</h2>
            <EmployeeCalendar />
          </section>
        </div>
    </div>
  );
};

export default EmployysPage;
