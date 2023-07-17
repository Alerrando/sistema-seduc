import { configureStore } from '@reduxjs/toolkit';
import sliceReducer from './slice';
import sliceLogin from './slice/LoginSlide';
import sliceFilter from './slice/FilterSlice';

export const store = configureStore({
  reducer:{
    Slice: sliceReducer,
    SliceFilter: sliceFilter,
    SliceLogin: sliceLogin,
  }
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
