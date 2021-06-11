import { configureStore, combineReducers } from '@reduxjs/toolkit';

export interface ActionType {
  type: string;
  payload?: any;
}

const rootReducer = combineReducers({

});

const store = configureStore({
  reducer: rootReducer
})

export default store;