import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./authSlice" 
import BillReducer from "./billSlice"
export const store=configureStore(
    {
        reducer:{
            Auth:AuthReducer,
            Bill:BillReducer
        }
    }
)