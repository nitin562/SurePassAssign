import { createSlice } from "@reduxjs/toolkit";
export const BillSlice=createSlice({
    name:"Bill",
    initialState:{
        bill:[]
    },
    reducers:{
        add:(state,action)=>{
            state.bill.push(action.payload)
            console.log(state.bill)
        }
    }
})
export const {add}=BillSlice.actions
export default BillSlice.reducer