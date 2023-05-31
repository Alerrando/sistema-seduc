import { configureStore } from "@reduxjs/toolkit";
import SliceReducer from "./slice";

export const store = configureStore({
	reducer: {
		Slice: SliceReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;