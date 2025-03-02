import React, { createContext, useState, useMemo, ReactNode, useEffect } from 'react';

export interface Task {
  id: number;
  title: string;
  description: string;
  due_date: string;
  status: "new" | "completed" | "in progress"; 
  project_id: number | null;
  photo_url:string,
  user_id: number;
  created_at: string;
  updated_at: string;
  customer_name:string,
  customer_address:string,
  customer_phone:string | number
}

export interface User {
  id:number,
  first_name:string,
  last_name:string,
  gender:string,
  email:string;
  role:string
}
interface UsersResponse {
  success: boolean;
  data: User[];
}

interface ContextData {
  tasks: Task[];
  users: UsersResponse;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>
  setUsers: (users: UsersResponse) => void;
}


const defaultContext: ContextData = {
  tasks: [],
  users: {
    success:false,
    data:[]
  },    
  setTasks: () => {},
  setUsers: () => {},
};
interface DataProviderProps {
  children: ReactNode;
}

export const DataContext = createContext<ContextData>(defaultContext);

export const useData = (): ContextData => {
  const context = React.useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<UsersResponse>({
    success:false,
    data:[]
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [filteredUsers,setFilteredUsers]=React.useState([]);

  const contextValue = useMemo(() => ({
    tasks,
    users,
    setTasks,
    setUsers,
  }), [tasks, users]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tasksRes, usersRes] = await Promise.all([
          fetch('http://localhost:5000/api/tasks' , { credentials: 'include' }),
          fetch('http://localhost:5000/api/users', { credentials: 'include' }),
        ]);

        const tasksData: Task[] = await tasksRes.json();
        const usersData: UsersResponse = await usersRes.json();
        setTasks(tasksData);
        setUsers({success:true,
          data:usersData.data
        })
     
      } catch (error) {
       throw new Error()
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
};
