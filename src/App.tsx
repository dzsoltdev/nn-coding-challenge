import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {useLocalStorage, useGeolocation} from 'react-use';
import './App.scss';
import classNames from "classnames";

import {AppSettingsContext, Theme, UnitType} from "./utility/appSettingsContext";
import {getWeatherData} from "./store/weatherState/weatherActions";

function App() {
  const dispatch = useDispatch();
  const [activeUnitType, setActiveUnitType] = useLocalStorage<UnitType>('active-unit-type', UnitType.METRIC);
  const [activeTheme, setActiveTheme] = useLocalStorage<Theme>('active-theme', Theme.LIGHT);

  // const {loading, latitude, longitude} = useGeolocation();
  const location = useGeolocation();

  useEffect(() => {
    if(!location.loading) getWeatherData(dispatch, {
      lat: location.latitude,
      lon: location.longitude,
      units: activeUnitType
    })
  }, [location.loading]);

  return (
    <AppSettingsContext.Provider value={{
      unitType: activeUnitType ?? UnitType.METRIC,
      setUnitType: setActiveUnitType,
      theme: activeTheme ?? Theme.LIGHT,
      setTheme: setActiveTheme
    }}>
      <div className={classNames('app', activeTheme)}>
        <header className="app-header">
        </header>
      </div>
    </AppSettingsContext.Provider>
  );
}

export default App;
