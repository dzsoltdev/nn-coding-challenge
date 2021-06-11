import { createContext, useContext } from 'react';

export enum UnitType {
  METRIC = 'metric',
  IMPERIAL = 'imperial'
}

export enum Theme {
  DARK = 'dark',
  LIGHT = 'light'
}

export type AppSettingsContextType = {
  unitType: UnitType;
  setUnitType: Function;

  theme: Theme;
  setTheme: Function;
}

export const AppSettingsContext = createContext<AppSettingsContextType>({
  unitType: UnitType.METRIC,
  theme: Theme.LIGHT,
  setUnitType: () => console.warn('no setter provider'),
  setTheme: () => console.warn('no setter provider'),
});
export const useAppSettingsContext = () => useContext(AppSettingsContext);