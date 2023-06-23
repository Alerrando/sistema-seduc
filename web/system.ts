import { configureStore } from "@reduxjs/toolkit";
import SliceReducer from "./slice";
import SliceTeacher from './slice/TeacherFilterSlice';

export const store = configureStore({
	reducer: {
		Slice: SliceReducer,
		SliceTeacher: SliceTeacher,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;