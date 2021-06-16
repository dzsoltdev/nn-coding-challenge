import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {getWeatherDataByCity} from "../store/weatherState/weatherActions";
import {useAppSettingsContext} from "../utility/appSettingsContext";
import {Transition} from "react-transition-group";
import {formatTemperature} from "../utility/valueFormatter";
import moment from "moment";

const transitionDuration = 300;
const cycleDuration = 5000;
const defaultStyle: any = {
  transition: `opacity ${transitionDuration}ms ease-in-out`,
  opacity: 0,
}

const transitionStyles: any = {
  entering: { opacity: 1 },
  entered:  { opacity: 1 },
  exiting:  { opacity: 0 },
  exited:  { opacity: 0 },
};

const GlobalWeatherWidget = () => {
  const dispatch = useDispatch();
  const {unitType} = useAppSettingsContext();

  const data = useSelector((state: any) => state.weather.globalData);
  const dataState = useSelector((state: any) => state.weather.globalDataState);

  const [visibleItemIndex, setVisibleItemIndex] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setVisibleItemIndex(visibleItemIndex === (Object.keys(data).length - 1) ? 0 : visibleItemIndex + 1);
    }, (cycleDuration + transitionDuration));
  }, [visibleItemIndex]);

  useEffect(() => {
    getWeatherDataByCity(dispatch, {
      units: unitType
    });
  }, [unitType]);

  return <div className={'weather global'}>
    {Object.keys(data).map((key: string, index: number) => {
      const item = data[key];

      return <Transition key={key} in={visibleItemIndex === index} timeout={transitionDuration}>
        {state => (
          <div className={'widget-item'}
               style={{
            ...defaultStyle,
            ...transitionStyles[state]
          }}>
            <label className={'title'}>{key}</label>
            <div className={'current'}>
              <span className={'value'}>{formatTemperature(item.main.temp, unitType)}</span>
              <img className={'icon'} src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}/>
              <span className={'description'}>{item.weather[0].description}</span>
            </div>
          </div>
        )}
      </Transition>
    })}
  </div>
};

export default GlobalWeatherWidget