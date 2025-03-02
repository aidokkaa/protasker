import React, { useEffect } from 'react';
import { useData } from '../context/DataContext';
import { useNavigate,Link } from 'react-router-dom';

const AssignT = () => {
  const { tasks, users, setTasks } = useData();

  const filteredUsers = Array.isArray(users.data) ? users.data.filter(user => user.role === 'user') : [];

  const today = new Date().toISOString().split('T')[0];


  const todaysTasks = tasks.filter(item => {
    return item.due_date.split('T')[0] === today;
  });


  const [assignedUsers, setAssignedUsers] = React.useState<number[]>([]);
  const [assignedTasks, setAssignedTasks] = React.useState<Record<number, { assigned: boolean, userName: string }>>({});

  const [errorUserId, setErrorUserId] = React.useState<number | null>(null);

  const getAssignedTasks = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/assigns', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        const updatedTasks: Record<number, { assigned: boolean, userName: string }> = {};
        data.forEach((item: any) => {
          updatedTasks[item.task.id] = {
            assigned: true,
            userName: `${item.user.first_name} ${item.user.last_name}`,
          };
        });

        setAssignedTasks((prevState) => {
          if (JSON.stringify(prevState) === JSON.stringify(updatedTasks)) {
            return prevState;
          }
          return updatedTasks;
        });
      } else {
      }
    } catch (err) {
       throw new Error();
    }
  };

  useEffect(() => {
    getAssignedTasks();
  }, [assignedTasks]);

  const handleDragStart = (e: React.DragEvent, taskId: number) => {
    e.dataTransfer.setData('taskId', taskId.toString());
  };

  const handleDrop = (e: React.DragEvent, userId: number) => {
    const taskId = Number(e.dataTransfer.getData('taskId'));
    assignTaskToUser(taskId, userId);
  };

  const assignTaskToUser = async (taskId: number, userId: number) => {
    try {
      const user = users.data.find((u) => u.id === userId); 
      if (!user) return; 
      const response = await fetch('http://localhost:5000/api/tasks/assign-task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, taskId }),
        credentials: 'include',
      });
      const data = await response.json();
      if (response.ok) {
        setAssignedUsers((prevState) => [...prevState, userId]);
        setTimeout(() => {
          alert('Задача успешно назначена пользователю');
        }, 10);
        setTimeout(() => {
          setAssignedUsers([]);
        }, 1000);
        setAssignedTasks((prevState) => ({
          ...prevState,
          [taskId]: { assigned: true, userName: user.first_name },
        }));
      } else {
        setErrorUserId(userId);

        setTimeout(() => {
          alert('Task already assigned !');
        }, 10);

        setTimeout(() => {
          setErrorUserId(null);
        }, 1000);
      }
    } catch (err) {
      throw new Error();
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('userData');
    alert('You have been logged out!');
    navigate('/login', { replace: true });
    window.location.reload(); // 
  };

  return (
    <div>
      <div className="navTop">
      <Link className='link' to={'/'}> <p className='logo'>PROTASKER</p>  </Link>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="assignContainer">
        <div className="todaysTasks">
          <h2>Tasks for today</h2>
          {todaysTasks.length > 0 ? (
            todaysTasks.map((item) => (
              <div key={item.id} className="task-item">
                <p className="task-title">{item.title}</p>
                <p className="task-description">{item.description}</p>
              </div>
            ))
          ) : (
            <p className="no-tasks">No tasks for today</p>
          )}
        </div>
        <div className="usersAndtasks">
  <div className="users">
    <h2>Employees:</h2>
    {filteredUsers.length > 0 ? (
      filteredUsers.map((user) => (
        <div
          key={user.id}
          className={`userCard ${assignedUsers.includes(user.id) ? 'assigned' : ''} ${errorUserId === user.id ? 'error' : ''}`}
          onDragOver={(e) => handleDragOver(e)}
          onDrop={(e) => handleDrop(e, user.id)}
        >
          <h2>{user.first_name}</h2>
        </div>
      ))
    ) : (
      <p className="noDataMessage">No employees available.</p>
    )}
  </div>

  <div className="dragArrow">
    <img style={{ width: '70px' }} src="https://cdn-icons-png.flaticon.com/512/20/20856.png" alt="" />
    <p>Just drag the task onto the employee</p>
  </div>
  <h2>Tasks:</h2>
  <div className="tasks">
   
    {tasks.length > 0 ? (
      tasks.map((item) => (
        <div
          key={item.id}
          className="taskCard"
          draggable
          onDragStart={(e) => handleDragStart(e, item.id)}
        >
          {assignedTasks[item.id]?.assigned && (
            <div className="assignedText">✔️ <b>Assigned to:</b> {assignedTasks[item.id]?.userName}</div>
            
          )}
            <span><b>Task:  </b>{item.title}</span>
          <span>
            <b>Status: </b>
            {item.status}
          </span>
        </div>
      ))
    ) : (
      <p className="noDataMessage">No tasks available.</p>
    )}
  </div>
</div>

      </div>
    </div>
  );
};

export default AssignT;
