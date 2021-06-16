import {weatherActionTypes} from "./weatherStateTypes";
import axios from "axios";
import {DATA_STATE} from "../dataStateConstants";
import moment from "moment";

interface WeatherParams {
  lat: string,
  lon: string,
  units: string
}

const API_KEY = 'a23560fa3f2603966851cd344571833b';

export const getWeatherDataByLocation = async (dispatch: Function, params: any, forceRefresh?: boolean) => {
  dispatch({
    type: weatherActionTypes.SET_LOCAL_WEATHER_DATA_STATE,
    payload: DATA_STATE.FETCHING
  });

  let data: any;

  if(!forceRefresh) {
    data = sessionStorage.getItem('localWeather');
    if(data) data = JSON.parse(data);
  }

  if(forceRefresh || !data?.current?.dt || moment(data.current.dt * 1000).format('yy-mm-dd') !== moment().format('yy-mm-dd')) {
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/onecall?lat=${params.lat}&lon=${params.lon}&units=${params.units}&appid=${API_KEY}`);
    data = response?.data;

    if(data) sessionStorage.setItem('localWeather', JSON.stringify(data));
  }

  if(data) {
    dispatch({
      type: weatherActionTypes.GET_LOCAL_WEATHER_DATA,
      payload: data
    });
  } else {
    dispatch({
      type: weatherActionTypes.SET_LOCAL_WEATHER_DATA_STATE,
      payload: DATA_STATE.ERROR
    });
  }
}

export const getWeatherDataByCity = async (dispatch: Function, params: any) => {
  dispatch({
    type: weatherActionTypes.SET_GLOBAL_WEATHER_DATA_STATE,
    payload: DATA_STATE.FETCHING
  });

  let data: any;

  Promise.all(cities.map((city: string) => {
    return axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=${params.units}&appid=${API_KEY}`);
  })).then((results: Array<any>) => {
    data = results.reduce((acc: any, result: any, index: number) => {
      let city = cities[index].split(',')[0];

      return {
        ...acc,
        [city]: result.data
      }
    }, {});

    if(data) {
      dispatch({
        type: weatherActionTypes.GET_GLOBAL_WEATHER_DATA,
        payload: data
      });
    } else {
      dispatch({
        type: weatherActionTypes.SET_GLOBAL_WEATHER_DATA_STATE,
        payload: DATA_STATE.ERROR
      });
    }
  }).catch(() => {
    dispatch({
      type: weatherActionTypes.SET_GLOBAL_WEATHER_DATA_STATE,
      payload: DATA_STATE.ERROR
    });
  });
}

const cities = [
  'Los Angeles,CA,US', 'New York,NY,US', 'London,UK', 'Budapest,HU', 'Mumbai,IN', 'Tokio,JP'
]