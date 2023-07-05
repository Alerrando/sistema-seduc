import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import { persistStore, persistReducer } from 'redux-persist';
import { createWrapper } from 'next-redux-wrapper';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import SliceReducer from './slice';
import SliceTeacher from './slice/TeacherFilterSlice';
import SliceLogin from './slice/LoginSlide';

const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
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
