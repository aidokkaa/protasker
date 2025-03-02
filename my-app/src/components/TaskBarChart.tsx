import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Task } from '../context/DataContext';

ChartJS.register(ArcElement, Tooltip, Legend, Title, ChartDataLabels);

interface TaskPieChartProps {
  tasks: Task[]; 
}

const TaskPieChart: React.FC<TaskPieChartProps> = ({ tasks }) => {
  const normalizedStatus = (status: string): "new" | "completed" | "in progress" => {
    if (status === "new" || status === "completed" || status === "in progress") {
      return status;
    }
    if (status === "in process") return "in progress";
    return "new"; 
  };


  const statusCounts = tasks.reduce(
    (acc: { [key: string]: number }, task) => {
      const normalized = normalizedStatus(task.status);
      acc[normalized] = (acc[normalized] || 0) + 1;
      return acc;
    },
    { new: 0, completed: 0, "in progress": 0 } 
  );

  const totalTasks = tasks.length;

  const data = {
    labels: ['New', 'Completed', 'In Progress'],
    datasets: [
      {
        data: [
          statusCounts['new'] || 0,
          statusCounts['completed'] || 0,
          statusCounts['in progress'] || 0,
        ],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], 
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const percentages = [
    ((statusCounts['new'] || 0) / totalTasks * 100).toFixed(1),
    ((statusCounts['completed'] || 0) / totalTasks * 100).toFixed(1),
    ((statusCounts['in progress'] || 0) / totalTasks * 100).toFixed(1),
  ];

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: '55%', height: '400px' }}>
        <h2 style={{ margin: '70px 0' }}>Task Status Distribution</h2>
        <Pie data={data} />
      </div>

      <div style={{ marginLeft: '20px' }}>
        <h3>Task Status Percentages</h3>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li><strong>New:</strong> {percentages[0]}%</li>
          <li><strong>Completed:</strong> {percentages[1]}%</li>
          <li><strong>In Progress:</strong> {percentages[2]}%</li>
        </ul>
      </div>
    </div>
  );
};

export default TaskPieChart;
