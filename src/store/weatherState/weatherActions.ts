import {weatherActionTypes} from "./weatherStateTypes";
import axios from "axios";
import {DATA_STATE} from "../dataStateConstants";

interface WeatherParams {
  lat: string,
  lon: string,
  units: string
}

const API_KEY = 'a23560fa3f2603966851cd344571833b';

export const getWeatherDataByLocation = async (dispatch: Function, params: any) => {
  dispatch({
    type: weatherActionTypes.SET_WEATHER_DATA_STATE,
    payload: DATA_STATE.FETCHING
  });

  const response = await axios.get(`http://api.openweathermap.org/data/2.5/onecall?lat=${params.lat}&lon=${params.lon}&units=${params.units}&appid=${API_KEY}`);
  let data = response?.data;

  if(data) {
    dispatch({
      type: weatherActionTypes.GET_WEATHER_DATA,
      payload: data
    });
  } else {
    dispatch({
      type: weatherActionTypes.SET_WEATHER_DATA_STATE,
      payload: DATA_STATE.ERROR
    });
  }
}

export const getWeatherDataByCity = async (dispatch: Function, params: any) => {
  dispatch({
    type: weatherActionTypes.SET_WEATHER_DATA_STATE,
    payload: DATA_STATE.FETCHING
  });

  // const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=Budapest,HU&units=${params.units}&appid=${API_KEY}`);
  const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=Los Angeles,CA,US&units=${params.units}&appid=${API_KEY}`);
  let data = response?.data;

  if(data) {
    dispatch({
      type: weatherActionTypes.GET_WEATHER_DATA,
      payload: data
    });
  } else {
    dispatch({
      type: weatherActionTypes.SET_WEATHER_DATA_STATE,
      payload: DATA_STATE.ERROR
    });
  }
}