import {weatherActionTypes, WeatherState} from './weatherStateTypes';
import {ActionType} from "../index";
import {DATA_STATE} from "../dataStateConstants";

const initialState: WeatherState = {
  localData: null,
  localDataState: DATA_STATE.INITIAL,
  globalData: {},
  globalDataState: DATA_STATE.INITIAL,
};

const weatherReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case weatherActionTypes.GET_LOCAL_WEATHER_DATA: {
      return {
        ...state,
        localData: action.payload,
        localDataState: DATA_STATE.READY
      };
    }
    case weatherActionTypes.SET_LOCAL_WEATHER_DATA_STATE: {
      return {
        ...state,
        localDataState: action.payload
      };
    }
    case weatherActionTypes.GET_GLOBAL_WEATHER_DATA: {
      return {
        ...state,
        globalData: {
          ...state.globalData,
          ...action.payload,
        },
        globalDataState: DATA_STATE.READY
      };
    }
    case weatherActionTypes.SET_GLOBAL_WEATHER_DATA_STATE: {
      return {
        ...state,
        globalDataState: action.payload
      };
    }
    default:
      return state;
  }
}

export default weatherReducer;