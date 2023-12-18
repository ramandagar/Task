// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import scheduleReducer from '../Slices/MatchSlice';

export const store = configureStore({
  reducer: {
    schedule: scheduleReducer,
  },
});

export default store
