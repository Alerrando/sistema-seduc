import { combineReducers, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { store as systemStore } from './system';
import SliceReducer from './slice';
import SliceTeacher from './slice/TeacherFilterSlice';
import SliceLogin from './slice/LoginSlide';

const persistConfig = {
  key: 'root',
  storage,
};

const authPersistConfig = {
  key: 'auth',
  storage: storage,
  blacklist: ['somethingTemporary'],
}

const rootReducer = combineReducers({
  Slice: SliceReducer,
  SliceTeacher: SliceTeacher,
  SliceLogin: SliceLogin,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
