import {combineReducers} from 'redux';
// import {persistReducer} from 'redux-persist';
import todosReducer from './slices/todo';

import AsyncStorage from '@react-native-async-storage/async-storage';

const rootPersistConfig = {
  key: 'root',
  keyPrefix: 'redux-',
  storage: AsyncStorage,
  whitelist: [],
};

const rootReducer = combineReducers({
  todos: todosReducer,
});

export {rootPersistConfig, rootReducer};
