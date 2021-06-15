import numbro from "numbro";

import {UnitType} from "./appSettingsContext";

export const formatTemperature = (value: number, type: UnitType) => {
  return `${numbro(value).format({
    mantissa: 1
  })} °${type === UnitType.METRIC ? 'C' : 'F'}`;
};