import React from 'react';
import {useLocalStorage} from 'react-use';
import './App.css';

import {AppSettingsContext, Theme, UnitType} from "./utility/appSettingsContext";

function App() {
  const [activeUnitType, setActiveUnitType] = useLocalStorage<UnitType>('active-unit-type', UnitType.METRIC);
  const [activeTheme, setActiveTheme] = useLocalStorage<Theme>('active-theme', Theme.LIGHT);

  return (
    <AppSettingsContext.Provider value={{
      unitType: activeUnitType ?? UnitType.METRIC,
      setUnitType: setActiveUnitType,
      theme: activeTheme ?? Theme.LIGHT,
      setTheme: setActiveTheme
    }}>
      <div className="App">
        <header className="App-header">

        </header>
      </div>
    </AppSettingsContext.Provider>
  );
}

export default App;
