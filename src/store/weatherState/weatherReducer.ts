import {weatherActionTypes, WeatherState} from './weatherStateTypes';
import {ActionType} from "../index";
import {DATA_STATE} from "../dataStateConstants";

const initialState: WeatherState = {
  data: null,
  dataState: DATA_STATE.INITIAL
};

const weatherReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case weatherActionTypes.GET_WEATHER_DATA: {
      return {
        data: action.payload,
        dataState: DATA_STATE.READY
      };
    }
    case weatherActionTypes.SET_WEATHER_DATA_STATE: {
      return {
        dataState: action.payload
      };
    }
    default:
      return state;
  }
}

export default weatherReducer;