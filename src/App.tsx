import React, {useCallback} from 'react';
import {useSessionStorage} from 'react-use';
import './styles/App.scss';
import classNames from "classnames";
import Switch from '@material-ui/core/Switch';

import {AppSettingsContext, Theme, UnitType} from "./utility/appSettingsContext";

import WidgetContainer from "./components/WidgetContainer";

function App() {

  const [activeUnitType, setActiveUnitType] = useSessionStorage<UnitType>('active-unit-type', UnitType.METRIC);
  const [activeTheme, setActiveTheme] = useSessionStorage<Theme>('active-theme', Theme.LIGHT);

  const handleUnitTypeChange = useCallback(() => {
    if(activeUnitType === UnitType.METRIC) setActiveUnitType(UnitType.IMPERIAL);
    else setActiveUnitType(UnitType.METRIC);
  }, [activeUnitType]);

  const handleThemeChange = useCallback(() => {
    if(activeTheme === Theme.LIGHT) setActiveTheme(Theme.DARK);
    else setActiveTheme(Theme.LIGHT);
  }, [activeTheme]);

  return (
    <AppSettingsContext.Provider value={{
      unitType: activeUnitType ?? UnitType.METRIC,
      setUnitType: setActiveUnitType,
      theme: activeTheme ?? Theme.LIGHT,
      setTheme: setActiveTheme
    }}>
      <div className={classNames('app', activeTheme)}>
        <header className="app-header">
          <h1>NN Weather App</h1>
          <div className={'controls'}>
            <div className={'control'} onClick={handleThemeChange}>
              <Switch checked={activeTheme === Theme.DARK}
                      size="small"/>
              <label>Switch to {activeTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT} theme</label>
            </div>
            <div className={'control'} onClick={handleUnitTypeChange}>
              <Switch checked={activeUnitType === UnitType.IMPERIAL}
                      size="small"/>
              <label>Switch to {activeUnitType === UnitType.METRIC ? UnitType.IMPERIAL : UnitType.METRIC} unit types</label>
            </div>
          </div>
        </header>

        <WidgetContainer />
      </div>
    </AppSettingsContext.Provider>
  );
}

export default App;
