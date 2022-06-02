import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import dishReducer from '../features/dish/dishSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dish: dishReducer,
  },
});
