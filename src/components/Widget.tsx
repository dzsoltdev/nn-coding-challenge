import React, {useCallback} from "react";
import classNames from "classnames";

import {useAppSettingsContext} from "../utility/appSettingsContext";

import LocalWeatherWidget from "./LocalWeatherWidget";
import GlobalWeatherWidget from "./GlobalWeatherWidget";

export enum WidgetType {
  LOCAL_WEATHER = 'LOCAL_WEATHER',
  GLOBAL_WEATHER = 'GLOBAL_WEATHER'
}

interface WidgetProps {
  type: WidgetType
}

const Widget = (props: WidgetProps) => {
  const {type} = props;
  const {theme} = useAppSettingsContext();

  const renderWidgetByType = useCallback(() => {
    switch (type) {
      case WidgetType.LOCAL_WEATHER: return <LocalWeatherWidget />
      case WidgetType.GLOBAL_WEATHER: return <GlobalWeatherWidget />
      default: return null
    }
  },[type]);

  return <div className={classNames('widget', theme)}>
    {renderWidgetByType()}
  </div>
};

export default Widget;