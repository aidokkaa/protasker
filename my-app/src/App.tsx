import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate, useNavigate } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import RegisterPage from './components/RegisterPage'
import LoginPage from './components/LoginPage';
import ManagerPage from './components/ManagerPage';
import LandingPage from './components/LandingPage';
import EmployysPage from './components/EmployeesPage';
import EmployyeList from './components/EmployeeList';
import AssignT from './components/AssignT';
import { UserProvider } from './context/LoginContext';
import EmployyetaskById from './components/EmployeetaskById';
import TaskListPage from './components/TaskListPage';


function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <LandingPage />,
    },
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      path: '/register',
      element: <RegisterPage />,
    },
    {
      path: '/manager',
      element: (
        <DataProvider>
            <ManagerPage />
        </DataProvider> 
      )  
      
    }
 ,
    {
      path: '/emp',
      element: <EmployysPage></EmployysPage>,
    },
    {
      path: '/employyeList',
      element: 
        <EmployyeList></EmployyeList>
    
    },
    {
      path: '/assign-task',
      element: <AssignT/>,
    },
    {
      path: '/employyetask/:id',
      element: <EmployyetaskById/>,
    },
    {
      path: '/taskslistpage',
      element: <TaskListPage/>,
    },

  ]);

  return<UserProvider> <DataProvider>
    <RouterProvider router={router} />
  </DataProvider>
  </UserProvider>;
}

export default App;
