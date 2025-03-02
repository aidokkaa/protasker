import React, { useContext } from 'react';
import TaskPieChart from './TaskBarChart';
import { DataContext, Task } from '../context/DataContext';


  const convertStatus = (status: string): "new" | "completed" | "in progress" => {
    if (status === "new" || status === "completed" || status === "in progress") {
      return status as "new" | "completed" | "in progress";
    }
    return "new"; 
  }
 
const ManagerMRight = () => {
    const {tasks}=React.useContext(DataContext)
        const [startDate, setStartDate] = React.useState<Date | null>(new Date());
        const handleChange = (date: Date | null) => {
            setStartDate(date);
          };
  return (
    <div>
     <div className="mainRight">
       <TaskPieChart tasks={tasks}/>
        </div>
    </div>
  )
}

export default ManagerMRight