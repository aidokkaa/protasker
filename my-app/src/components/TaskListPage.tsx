import React, { useState, useContext } from 'react';
import { DataContext } from '../context/DataContext';
import { Task } from '../context/DataContext';
import '../scss/styles/_taskListpage.scss';

const TaskListPage = () => {
  const { tasks, setTasks } = useContext(DataContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (filterStatus ? task.status === filterStatus : true)
  );

  const handleDeleteTask = async (taskId: number) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this task?');
    
    if (!isConfirmed) return;

    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      setTasks((prevTasks: Task[]) => prevTasks.filter((task: Task) => task.id !== taskId));

      setTimeout(() => {
        alert('Task successfully deleted!');
      }, 1000);
      
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Error deleting task. Please try again.');
    }
  };

  return (
    <div className="task-list-page">
      <header className="task-header">
        <h1>Task List</h1>
        <p className="task-count">Total Tasks: {tasks.length}</p>
      </header>

      <div className="task-controls">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="">All Statuses</option>
          <option value="new">New</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="task-list">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <div key={task.id} className="task-card">
              <h2>{task.title}</h2>
              <p>{task.description}</p>
              <p><strong>Status:</strong> {task.status}</p>
              <p><strong>Due Date:</strong> {task.due_date.split('T')[0]}</p>
              <p><strong>Customer:</strong> {task.customer_name}</p>
              <p><strong>Phone:</strong> {task.customer_phone}</p>
              
              {task.photo_url ? (
                <img src={`http://localhost:5000${task.photo_url}`} alt="Task" className="task-photo" />
              ) : (
                <p>No Photo</p>
              )}

              <button className="delete-btn" onClick={() => handleDeleteTask(task.id)}>Delete</button>
            </div>
          ))
        ) : (
          <p className="no-tasks">No tasks found</p>
        )}
      </div>
    </div>
  );
};

export default TaskListPage;
