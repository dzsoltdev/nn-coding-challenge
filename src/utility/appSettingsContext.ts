import { createContext, useContext } from 'react';

export enum UnitType {
  METRIC = 'METRIC',
  IMPERIAL = 'IMPERIAL'
}

export enum Theme {
  DARK = 'DARK',
  LIGHT = 'LIGHT'
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