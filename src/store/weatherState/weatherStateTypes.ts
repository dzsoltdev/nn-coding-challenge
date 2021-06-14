import {DATA_STATE} from "../dataStateConstants";

export interface WeatherState {
  localData: any,
  localDataState: DATA_STATE
  globalData: any,
  globalDataState: DATA_STATE
}

export enum weatherActionTypes {
  GET_LOCAL_WEATHER_DATA = "GET_LOCAL_WEATHER_DATA",
  SET_LOCAL_WEATHER_DATA_STATE = "SET_LOCAL_WEATHER_DATA_STATE",
  GET_GLOBAL_WEATHER_DATA = "GET_GLOBAL_WEATHER_DATA",
  SET_GLOBAL_WEATHER_DATA_STATE = "SET_GLOBAL_WEATHER_DATA_STATE"
}