import { configureStore } from '@reduxjs/toolkit';
import sliceReducer from './slice';
import sliceTeacher from './slice/TeacherFilterSlice';
import sliceLogin from './slice/LoginSlide';

export const store = configureStore({
  reducer:{
    Slice: sliceReducer,
    SliceTeacher: sliceTeacher,
    SliceLogin: sliceLogin,
  }
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
