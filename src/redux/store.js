import { configureStore } from '@reduxjs/toolkit';
import regexReducer from './regexSlice';

const store = configureStore({
  reducer: {
    regex: regexReducer,
  },
});

export default store;
