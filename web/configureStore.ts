import { configureStore } from '@reduxjs/toolkit';
import sliceReducer from './slice';
import sliceFilter from './slice/FilterSlice';
import sliceLogin from './slice/LoginSlice';

export const store = configureStore({
  reducer:{
    Slice: sliceReducer,
    SliceFilter: sliceFilter,
    SliceLogin: sliceLogin,
  }
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
