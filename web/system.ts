import { configureStore } from "@reduxjs/toolkit";
import SliceReducer from "./slice";
import SliceTeacher from './slice/TeacherFilterSlice';
import SliceLogin from "./slice/LoginSlide";

export const store = configureStore({
	reducer: {
		Slice: SliceReducer,
		SliceTeacher: SliceTeacher,
		SliceLogin: SliceLogin,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;