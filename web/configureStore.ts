import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import { persistStore, persistReducer } from 'redux-persist';
import { createWrapper } from 'next-redux-wrapper';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import SliceReducer from './slice';
import SliceTeacher from './slice/TeacherFilterSlice';
import SliceLogin from './slice/LoginSlide';

const createNoopStorage = () => {
  return {
    getItem(_key: string): Promise<string | null> {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: string): Promise<void> {
      return Promise.resolve();
    },
    removeItem(_key: string): Promise<void> {
      return Promise.resolve();
    },
  };
};

const rootReducer = combineReducers({
  Slice: SliceReducer,
  SliceTeacher: SliceTeacher,
  SliceLogin: SliceLogin,
});

const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const makeStore = () =>
  configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
  });

export const wrapper = createWrapper(makeStore, { debug: false });

export const persistor = persistStore(makeStore());
