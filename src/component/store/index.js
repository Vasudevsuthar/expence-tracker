import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import expenseReducer from "./expenseSlice";


const store= configureStore({
    reducer:{
        authReducer:authReducer,
        expenseReducer:expenseReducer,
    }
})
export default store;