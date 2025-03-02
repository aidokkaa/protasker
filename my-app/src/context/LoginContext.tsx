import React, {createContext, ReactNode} from 'react';;
export type userData= {
 id:number,
 first_name:string,
 last_name:string,
 email:string,
 gender:string,
 password:string,
 role:string
}
type userContextType= {
 user:userData ;
 setUser:(user:userData)=>void
}
type userProviderType ={
    children:ReactNode
}

export const LoginContext = createContext<userContextType | undefined>(undefined)
export const UserProvider:React.FC<userProviderType>=({children})=>{
    const [user,setUser]=React.useState<userData>({
        id:0,
 first_name:'',
 last_name:'',
 email:'',
 gender:'',
 password:'',
 role:'' 
    })
    return (
        <LoginContext.Provider value={{user,setUser}}>
         {children}
        </LoginContext.Provider>
    )

}
