import React, {useContext,createContext} from 'react'
import '../scss/styles/employyeTaskById.scss'
import { useParams,useNavigate,Link } from 'react-router-dom';
import { Task } from "../context/DataContext";
const EmployyetaskById = () => {

    const [date, setDate] = React.useState<Date | null>(new Date());
      const [tasks, setTasks] = React.useState<Task[]>([]);
      const [data,setData]=React.useState({
        id: 0,  
        title: '',
        description: '',
        due_date: '',
        status: '',
        customer_name: '',
        customer_address: '',
        customer_phone: '',
        photo_url:''
      });
      const [newPhoto,setNewPhoto]=React.useState<string | null>(null);
      const [newStatus,setNewStatus]=React.useState('')
      const {id}=useParams<{id:string}>();
      const taskId = Number(id)
      const userData = localStorage.getItem("userData");
      let user = null;
      if (userData) {
        user = JSON.parse(userData);
      }
      const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('taskId', String(taskId));  // Передаем ID задачи
      
          fetch('http://localhost:5000/upload', {
            method: 'POST',
            body: formData,
          })
            .then((response) => response.json())
            .then((data) => {
              console.log('File uploaded successfully:', data);
              // Обновляем состояние с новым URL
              setNewPhoto(`http://localhost:5000${data.file.path}`);
              // Можно также обновить данные задачи, если вы хотите отобразить новый путь
              setData((prevData) => ({
                ...prevData,
                photo_url: data.file.path,
              }));
            })
            .catch((error) => {
              console.error('Error uploading file:', error);
            });
        }
      };
      React.useEffect(() => {
        fetch("http://localhost:5000/api/tasks")
          .then((res) => res.json())
          .then((data) => setTasks(data))
          .catch((err) => console.error("Error fetching tasks:", err));
      }, []);
    
      const handleStatusChange = async (taskId: number, newStatus: "new" | "in progress" | "completed") => {
        try {
          const response = await fetch(`http://localhost:5000/api/tasks/${taskId}/status`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: newStatus }),
          });
      
          if (!response.ok) {
            throw new Error("Failed to update status");
          }
      
          const updatedTask = await response.json();
          setData((prevData) => ({
            ...prevData,
            status: updatedTask.status,
          }));
      
          setTimeout(() => {
            alert("Status updated successfully!");
          }, 500);
        } catch (error) {
          console.error("Error updating status:", error);
        }
      };
      const navigate = useNavigate()
      const handleLogout = () => {
        localStorage.removeItem('userData');
        alert('You have been logged out!');
        navigate('/login', { replace: true }); 
        window.location.reload(); // 
      };
      
      
     React.useEffect(()=>{
      const getTaskDetail = async (id:number)=>{
        try{
          const response = await fetch(`http://localhost:5000/api/tasks/${id}`,{
          credentials:'include'
        })
        const data = await response.json()
        setData(data)
        }catch(error){
         throw new Error()
        }
      }
      getTaskDetail(taskId)
    },
  [taskId])
      
      React.useEffect(() => {
        const fetchTasks = async () => {
          const userData = localStorage.getItem("userData");
          if (!userData) return;
          const user = JSON.parse(userData);
          const userID = user.id ? parseInt(user.id, 10) : null;
          try {
            const response = await fetch(`http://localhost:5000/api/employyetasks?user_id=${userID}`, {
              credentials: 'include'
            });
            const data = await response.json();

            setTasks(data);
          } catch (error) {
        throw new Error('Error fetching data')
          }
        };
      
        fetchTasks();
      }, []); 
  return (
    <div>
           <div className="navTop">
           <Link className='link' to={'/'}> <p className='logo'>PROTASKER</p>  </Link> 
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
      <div className="empTaskIdContainer">
      <div className="mainEmployye">
      <div className="userImg">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-SnDtnoTbs_JJtNW62ALeA4gKPtpCGcQ5CnVEJNNAddxjuLwrbo1c16rExrxYL4xLmIw&usqp=CAU" alt="" />
          </div>
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
        <div className="main">
        <div className="aboutTasks">
      {data.id !== 0 && (
        <div className="taskDetails">
          <h2>Task Details</h2>
          <table className="taskTable">
            <thead>
              <tr>
           
                <th>Title of task</th>
                <th>Description of task</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Customer Name</th>
                <th>Customer Address</th>
                <th>Customer Phone</th>
                <th>Photo</th> 
              </tr>
            </thead>
            <tbody>
              <tr>
     
                <td>{data.title}</td>
                <td>{data.description}</td>
                <td>{data.due_date.split('T')[0]}</td>
                <td> 
  <select
    value={data.status} 
    onChange={e => handleStatusChange(data.id, e.target.value as "new" | "in progress" | "completed")}
  >
    <option value="new">New</option>
    <option value="in progress">In Progress</option>
    <option value="completed">Completed</option>
  </select>
</td>

                <td>{data.customer_name}</td>
                <td>{data.customer_address}</td>
                <td>{data.customer_phone}</td>
                <td>
  {data.photo_url ? (
   <div>
     <img src={`http://localhost:5000${data.photo_url}`} alt="Task" className="task-photo" />
     <label className="custom-file-upload">
    <input type="file" onChange={handlePhotoUpload} />
    Update Photo
  </label>
   </div>
  ) : (
    <div>
      <p>No Photo</p>
    <label className="custom-file-upload">
    <input type="file" onChange={handlePhotoUpload} />
    Upload Photo
  </label>
    </div>
  )}

 
</td>

              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
        </div>
      </div>
    </div>
  )
}

export default EmployyetaskById