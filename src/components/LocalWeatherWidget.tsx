import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {useGeolocation} from "react-use";

import {getWeatherDataByLocation} from "../store/weatherState/weatherActions";
import {useAppSettingsContext} from "../utility/appSettingsContext";

const LocalWeatherWidget = () => {
  const dispatch = useDispatch();
  const location = useGeolocation();
  const {unitType} = useAppSettingsContext();

  useEffect(() => {
    if(!location.loading) getWeatherDataByLocation(dispatch, {
      lat: location.latitude,
      lon: location.longitude,
      units: unitType
    })
  }, [location.loading]);

  return <div>Local weather</div>
};

export default LocalWeatherWidget