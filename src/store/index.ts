import { configureStore, combineReducers } from '@reduxjs/toolkit';

import weatherReducer from "./weatherState/weatherReducer";

export interface ActionType {
  type: string;
  payload?: any;
}

const rootReducer = combineReducers({
  weather: weatherReducer
});

const store = configureStore({
  reducer: rootReducer
})

export default store;