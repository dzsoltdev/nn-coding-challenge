import React from "react";
import classNames from "classnames";
import "../styles/components/WidgetContainer.scss"

import Widget, {WidgetType} from "./Widget";

const WidgetContainer = () => {
  return <div className={classNames('widget-container')}>
    <Widget type={WidgetType.LOCAL_WEATHER}/>
    <Widget type={WidgetType.GLOBAL_WEATHER}/>
  </div>
}

export default WidgetContainer;