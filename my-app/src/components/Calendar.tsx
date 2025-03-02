import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../scss/styles/employyes.scss";
import { useNavigate } from "react-router-dom";
import { Task } from "../context/DataContext";

const EmployeeCalendar: React.FC = () => {
  const [date, setDate] = useState<Date | null>(new Date());
  const [tasks, setTasks] = useState<Task[]>([]);
  const [userID, setUserID] = useState<number | null>(null);
  const navigate = useNavigate();

  const formatDate = (date: Date) => date.toISOString().split("T")[0];

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      try {
        const user = JSON.parse(userData);
        if (user?.id) {
          setUserID(user.id);
        }
      } catch (error) {
        console.error("Error parsing userData:", error);
      }
    }
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      if (!userID) return;

      try {
        const response = await fetch(`http://localhost:5000/api/employyetasks?user_id=${userID}`, {
          credentials: "include",
        });

        if (!response.ok) throw new Error("Failed to fetch tasks");
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [userID]);

  const tasksForDate = tasks.filter(
    (task) => date && formatDate(new Date(task.due_date)) === formatDate(date)
  );

  return (
    <div className="calendar">
      <Calendar
        onChange={(value) => setDate(value as Date)}
        value={date}
        tileClassName={({ date }) => {
          const dateString = formatDate(date);
          return tasks.some((task) => formatDate(new Date(task.due_date)) === dateString)
            ? "task-day"
            : "";
        }}
      />

      <div className="column">
        <h3>Tasks for {date ? date.toDateString() : "No Date Selected"}:</h3>
        {
          tasksForDate.length >0 ? 
          tasksForDate.map(task=>(
            <>
              <div onClick={()=>{navigate(`/employyetask/${task.id}`)}} className="taskDetail">
                <p >{task.title}</p>
              </div>
            </>
          )) :
          (<p style={{textAlign:"center"}}>No tasks available!</p>)
        }
    </div>
    </div>
    )}

export default EmployeeCalendar;
