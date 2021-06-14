import React, {useEffect} from "react";
import {useDispatch} from "react-redux";

import {getWeatherDataByCity} from "../store/weatherState/weatherActions";
import {useAppSettingsContext} from "../utility/appSettingsContext";

const GlobalWeatherWidget = () => {
  const dispatch = useDispatch();
  const {unitType} = useAppSettingsContext();

  useEffect(() => {
    getWeatherDataByCity(dispatch, {
      units: unitType
    });
  }, [unitType]);

  return <div>Global weather</div>
};

export default GlobalWeatherWidget