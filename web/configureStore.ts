import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import sliceReducer from './slice';
import sliceTeacher from './slice/TeacherFilterSlice';
import sliceLogin from './slice/LoginSlide';
import { FLUSH, PAUSE, PURGE, REGISTER, REHYDRATE } from 'redux-persist';

const rootReducer = combineReducers({
  Slice: sliceReducer,
  SliceTeacher: sliceTeacher,
  SliceLogin: sliceLogin,
});

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


const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
