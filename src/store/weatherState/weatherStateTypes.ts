import {DATA_STATE} from "../dataStateConstants";

export interface WeatherState {
  data: any,
  dataState: DATA_STATE
}

export enum weatherActionTypes {
  GET_WEATHER_DATA = "GET_WEATHER_DATA",
  SET_WEATHER_DATA_STATE = "SET_WEATHER_DATA_STATE"
}