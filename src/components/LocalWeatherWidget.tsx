import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useGeolocation} from "react-use";
import classNames from "classnames";
import moment from "moment";

import ResponsiveLoader from "./ResponsiveLoader";

import {getWeatherDataByLocation} from "../store/weatherState/weatherActions";
import {useAppSettingsContext} from "../utility/appSettingsContext";
import {DATA_STATE} from "../store/dataStateConstants";
import {formatTemperature} from "../utility/valueFormatter";

import "../styles/components/WeatherWidget.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSyncAlt} from "@fortawesome/free-solid-svg-icons/faSyncAlt";

const LocalWeatherWidget = () => {
  const dispatch = useDispatch();
  const location = useGeolocation();
  const {unitType} = useAppSettingsContext();

  const data = useSelector((state: any) => state.weather.localData);
  const dataState = useSelector((state: any) => state.weather.localDataState);

  useEffect(() => {
    if(!location.loading) getWeatherDataByLocation(dispatch, {
      lat: location.latitude,
      lon: location.longitude,
      units: unitType
    });
  }, [location.loading, unitType]);

  const refreshWidget = useCallback(() => {
    getWeatherDataByLocation(dispatch, {
      lat: location.latitude,
      lon: location.longitude,
      units: unitType
    }, true);
  }, [unitType, location])

  return <div className={classNames('weather', 'local')}>
    {(dataState === DATA_STATE.FETCHING || location.loading) && <ResponsiveLoader />}
    {dataState === DATA_STATE.READY &&
      <>
        <div className={'widget-controls'}>
          <span className={'icon'} onClick={refreshWidget}><FontAwesomeIcon icon={faSyncAlt} size={'sm'}/></span>
        </div>
        <div className={'current'}>
          <span className={'value'}>{formatTemperature(data.current.temp, unitType)}</span>
          <img className={'icon'} src={`http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`}/>
          <span className={'description'}>{data.current.weather[0].description}</span>
          <div>Last refresh: {moment(data.current.dt * 1000).format('HH:mm')}</div>
        </div>

        <div>Forcast for the next 12 hours</div>
        <div className={classNames('forecast', 'hourly')}>
          {data.hourly.slice(1, 13).map((item: any) => (
            <div key={`hourly-forecast-${item.dt}`} className={'forecast-item'}>
              <span className={'time'}>{moment(item.dt * 1000).format('HH:mm')} </span>
              <span className={'value'}>{formatTemperature(item.temp, unitType)}</span>
              <img className={'icon'} src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}/>
            </div>
          ))}
        </div>

        <div>Forcast for the next 6 days</div>
        <div className={classNames('forecast', 'daily')}>
          {data.daily.slice(1, 7).map((item: any) => (
            <div key={`daily-forecast-${item.dt}`} className={'forecast-item'}>
              <span className={'time'}>{moment(item.dt * 1000).format('dddd')} </span>
              <span className={'value'}>{formatTemperature(item.temp.max, unitType)}</span>
              <span className={'value'}>{formatTemperature(item.temp.min, unitType)}</span>
              <img className={'icon'} src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}/>
            </div>
          ))}
        </div>
      </>
    }
  </div>
};

export default LocalWeatherWidget