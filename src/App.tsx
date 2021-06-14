import React, {useEffect} from 'react';
// import {useDispatch} from "react-redux";
import {useSessionStorage, useGeolocation} from 'react-use';
import './App.scss';
import classNames from "classnames";

import {AppSettingsContext, Theme, UnitType} from "./utility/appSettingsContext";

import WidgetContainer from "./components/WidgetContainer";

// import {getWeatherData} from "./store/weatherState/weatherActions";

function App() {
  // const dispatch = useDispatch();
  const [activeUnitType, setActiveUnitType] = useSessionStorage<UnitType>('active-unit-type', UnitType.METRIC);
  const [activeTheme, setActiveTheme] = useSessionStorage<Theme>('active-theme', Theme.LIGHT);

  // const location = useGeolocation();
  //
  // useEffect(() => {
  //   if(!location.loading) getWeatherData(dispatch, {
  //     lat: location.latitude,
  //     lon: location.longitude,
  //     units: activeUnitType
  //   })
  // }, [location.loading]);

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

        <WidgetContainer />
      </div>
    </AppSettingsContext.Provider>
  );
}

export default App;
