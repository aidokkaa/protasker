import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskList from './TaskList';
import TaskModal from './TaskModal';
import { Link } from 'react-router-dom';
import '../scss/styles/manager.scss'
import ManagerMRight from './ManagerMRight';
import { useData } from '../context/DataContext'
import { User } from '../context/DataContext';

const ManagerPage = () => {
  const { tasks,users,setTasks}=useData();
  const [openModal,setOpenModal]=React.useState<boolean>(false);
  const [userInfo, setuserInfo]=React.useState<User | null>(null);
const navigate = useNavigate()
const handleLogout = () => {
  localStorage.removeItem('userData');
  alert('You have been logged out!');
  navigate('/login', { replace: true }); 
  window.location.reload(); 
};
  const openModaltask = ()=>{
    setOpenModal(true)
  }
  React.useEffect(()=>{
     const user = localStorage.getItem('userData');
     if(user){
      setuserInfo(JSON.parse(user))
     }else{
      throw new Error()
     }
  },[])
  
  return (
    <div>
      <div className="navTop">
      <Link className='link' to={'/'}> <p className='logo'>PROTASKER</p>  </Link> 
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      <div className="mContainer">
    <div className="navandphoto">
    <div className="userImg">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-SnDtnoTbs_JJtNW62ALeA4gKPtpCGcQ5CnVEJNNAddxjuLwrbo1c16rExrxYL4xLmIw&usqp=CAU" alt="" />
        </div>
    <div className="nav">
      
         <h2>Manager Dashboard</h2>
         <h1 >Welcome, Manager!</h1>
         <div onClick={openModaltask} className='addTask'>  <p>Add task</p> </div>
         {
          openModal && (
            <TaskModal setTasks = {setTasks}  openModal={openModal} setOpenModal = {setOpenModal}/>
          )
         }
         <div className="navMenu">
          <Link className='link' to='#'><p className='link'>  Main</p></Link>
          <hr />
          <a className='link' href='/taskslistpage'><p className='link'> Tasks</p></a>
          <hr />
          <Link className='link' to='/employyeList'><p className='link'>  Employyes</p></Link>
          <hr />
          <Link className='link' to='#'><p className='link'>  Calendar</p></Link>
         </div>
       </div>
    </div>
       <div className="mainManager">  
         <div className="mainUserInfo">
         <div className="userInfo">
         <div className="info1">
          <span>First name: <span style={{fontWeight:"lighter"}}>{userInfo?.first_name}</span> </span>
          <span>Last Name: <span style={{fontWeight:"lighter"}}>{userInfo?.last_name}</span></span>
          <span>Gender: <span style={{fontWeight:"lighter"}}>{userInfo?.gender}</span></span>
         </div>
         <div className="info2">
          <span>Email: <span style={{fontWeight:"lighter"}}>{userInfo?.email}</span></span>
          <span>Role: <span style={{fontWeight:"lighter"}}>{userInfo?.role}</span> </span>
         </div>
         <div className="info3">
         <span> Phone number: <span  style={{fontWeight:"lighter"}}> 8978734898</span></span>
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
       <div className="mainContainer">
        <TaskList taskData = {tasks}/>
        <ManagerMRight/>
       </div>
       </div>
      </div>
      
    </div>
  )
}

export default ManagerPage
