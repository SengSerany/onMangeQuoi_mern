import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import dishReducer from '../features/dish/dishSlice';
import menuReducer from '../features/menu/menuSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dish: dishReducer,
    menu: menuReducer,
  },
});
