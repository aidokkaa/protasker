import React from 'react'
import '../scss/styles/taskList.scss';
import { Task } from '../context/DataContext';

interface Props{
  taskData:Task[]
} 
const TaskList:React.FC<Props> = ({taskData}) => {
  return (
<>
<div className='taskList'>
       <h2>Task List</h2>
        <div className="taskList-ul">
            <ul>
                { 
                taskData.map(task=>(
                  <React.Fragment key={task.id}>
                     <li>{task.title}</li>
                     <hr />
                  </React.Fragment>
                ))
                
                }
            </ul>
        </div>
    </div>
</>
   
  )
}

export default TaskList