import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import listReducer from './slices/listSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    lists: listReducer,
  },
});

export default store;
