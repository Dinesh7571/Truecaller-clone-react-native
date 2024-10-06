import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { mmkvStorage } from "./storage";
 interface UserStore{
    user:any;
    setUser:(data:any)=>void
 }

 export const useUserStore =create<UserStore>()(
    persist(
        (set,get)=>({
            user:null,
            setUser:(data)=>set({user:data})
        }),
        {
            name:'user-storage',
            storage:createJSONStorage(()=>mmkvStorage)
        }
    )
 )