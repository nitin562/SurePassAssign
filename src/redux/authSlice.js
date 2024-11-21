import { createSlice } from "@reduxjs/toolkit";

export const AuthData=createSlice({
    name:"Auth",
    initialState:{
        db:{}
    },
    reducers:{
        Register:(state,action)=>{
            const {email,password,name}=action.payload
            let user={}
            user[email]={password,name}
            state.db={...user,...state.db}
        }
    }
})
export const {Register}=AuthData.actions
export default AuthData.reducer