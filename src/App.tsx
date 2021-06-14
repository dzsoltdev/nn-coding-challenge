import React from 'react';
import {useSessionStorage} from 'react-use';
import './App.scss';
import classNames from "classnames";

import {AppSettingsContext, Theme, UnitType} from "./utility/appSettingsContext";

import WidgetContainer from "./components/WidgetContainer";

function App() {

  const [activeUnitType, setActiveUnitType] = useSessionStorage<UnitType>('active-unit-type', UnitType.METRIC);
  const [activeTheme, setActiveTheme] = useSessionStorage<Theme>('active-theme', Theme.LIGHT);

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
