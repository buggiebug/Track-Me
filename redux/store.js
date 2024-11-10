import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import expenseSlice from './slice/expenseSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        expenses: expenseSlice,
    },
});

export default store;
