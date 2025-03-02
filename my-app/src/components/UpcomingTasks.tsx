import React from 'react';
type Task = {
  date: string;
  description: string;
};

type UpcomingTasksProps = {
  tasks: Task[];
};

const UpcomingTasks: React.FC<UpcomingTasksProps> = ({ tasks }) => {
  const today = new Date();
  const upcomingTasks = tasks.filter((task) => {
    const taskDate = new Date(task.date);
    const diffInDays = (taskDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
    return diffInDays >= 0 && diffInDays <= 7; 
  });

  return (
    <div className="upcoming-tasks">
      <h2>Tasks for the next days</h2>
      {upcomingTasks.length > 0 ? (
        <ul>
          {upcomingTasks.map((task, index) => (
            <li key={index}>
              <strong>{new Date(task.date).toLocaleDateString()}:</strong> {task.description}
            </li>
          ))}
        </ul>
      ) : (
        <p>No tasks for the next few days</p>
      )}
    </div>
  );
};

export default UpcomingTasks;
