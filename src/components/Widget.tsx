import React, {useCallback, lazy, Suspense} from "react";
import classNames from "classnames";
import "../styles/components/Widget.scss"

import {useAppSettingsContext} from "../utility/appSettingsContext";

import ResponsiveLoader from "./ResponsiveLoader";
const LocalWeatherWidget = lazy(() => import('./LocalWeatherWidget'));
const GlobalWeatherWidget = lazy(() => import('./GlobalWeatherWidget'));

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
      case WidgetType.LOCAL_WEATHER: return <Suspense fallback={<ResponsiveLoader />}><LocalWeatherWidget /></Suspense>;
      case WidgetType.GLOBAL_WEATHER: return <Suspense fallback={<ResponsiveLoader />}><GlobalWeatherWidget /></Suspense>;
      default: return null
    }
  },[type]);

  return <div className={classNames('widget', theme)}>
    {renderWidgetByType()}
  </div>
};

export default Widget;