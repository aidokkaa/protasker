import React, { ChangeEvent } from 'react'
import '../scss/styles/taskModal.scss'
import { Task } from '../context/DataContext'

interface TaskModalProp {
  openModal: boolean,
  setOpenModal: (value: boolean) => void,
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>; // Передаем setTasks для обновления списка задач
}

const TaskModal: React.FC<TaskModalProp> = ({ openModal, setOpenModal, setTasks }) => {

  type Task = {
    title: string,
    description: string,
    due_date: Date | string,
    status: string,
    customer_name: string,
    customer_phone: string,
    customer_address: string,
  }

  const [taskObject, setTaskObject] = React.useState<Task>({
    title: '',
    description: '',
    due_date: new Date(),
    status: '',
    customer_name: '',
    customer_phone: '',
    customer_address: '',
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.name === 'due_date' ? new Date(e.target.value) : e.target.value
    setTaskObject(prev => ({ ...prev, [e.target.name]: value }))
  }

  const storageData = localStorage.getItem('data');
  let token: string | undefined
  let user_id: string | undefined;

  if (storageData) {
    const parsedData = JSON.parse(storageData);
    token = parsedData.token;
    user_id = parsedData.user?.id;
  }

  const payload = {
    ...taskObject,
    user_id,
  };

  const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    fetch('http://localhost:5000/api/tasks', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(data => {
        alert('Task added successfully!');
  
        setTasks(prevTasks => [...prevTasks, data]); 

        setOpenModal(false);
      })
      .catch(err => console.log(err));
  }

  return (
    <div className={`modal ${openModal ? 'active' : ''}`}>

      <div className="modal-body">
        <div onClick={() => setOpenModal(false)}>X</div>
        <form onSubmit={formSubmit} className="formModal">
          <input onChange={handleChange} name='title' type="text" placeholder='Title of task' />
          <input onChange={handleChange} type="text" name='description' placeholder='Description of task' />
          <input onChange={handleChange} type="date" name='due_date' />
          <select onChange={handleChange} name="status">
            <option value="">Select a status</option>
            <option value="new">New</option>
            <option value="in process">In process</option>
            <option value="completed">Completed</option>
          </select>
          <input onChange={handleChange} name='customer_name' type="text" placeholder='Customer name' />
          <input onChange={handleChange} name='customer_phone' type="tel" placeholder='Customer phone' />
          <input onChange={handleChange} name='customer_address' type="text" placeholder='Customer address' />
          <button type="submit">Add a task</button>
        </form>
      </div>
    </div>
  )
}

export default TaskModal
