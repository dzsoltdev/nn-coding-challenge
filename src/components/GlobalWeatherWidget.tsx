import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import classNames from "classnames";
import {getWeatherDataByCity} from "../store/weatherState/weatherActions";
import {useAppSettingsContext} from "../utility/appSettingsContext";
import {Transition} from "react-transition-group";
import {formatTemperature} from "../utility/valueFormatter";
import moment from "moment";
import {Modal, Zoom} from '@material-ui/core';
import {DATA_STATE} from "../store/dataStateConstants";
import CircularProgress from "@material-ui/core/CircularProgress";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCog} from "@fortawesome/free-solid-svg-icons/faCog";
import {faSyncAlt} from "@fortawesome/free-solid-svg-icons/faSyncAlt";

import "../styles/components/modal.scss"

const transitionDuration = 500;
const defaultCycleDuration = 5000;

const defaultStyle: any = {
  transition: `opacity ${transitionDuration}ms ease-in-out`,
  opacity: 0,
}

const transitionStyles: any = {
  entering: { opacity: 1 },
  entered:  { opacity: 1 },
  exiting:  { opacity: 0 },
  exited:  { opacity: 0 },
};

const GlobalWeatherWidget = () => {
  const dispatch = useDispatch();
  const {unitType, theme} = useAppSettingsContext();

  const data = useSelector((state: any) => state.weather.globalData);
  const dataState = useSelector((state: any) => state.weather.globalDataState);

  const [visibleItemIndex, setVisibleItemIndex] = useState(0);

  const [cycleDuration, setCycleDuration] = useState(defaultCycleDuration);
  const [updatedCycleDuration, setUpdatedCycleDuration] = useState<number | null>(null);
  const handleCyleDurationChange = (duration: string) => {
    setUpdatedCycleDuration(Number(duration) * 1000);
  }

  const applyCyleDurationChange = () => {
    setCycleDuration(updatedCycleDuration ?? defaultCycleDuration);
    setUpdatedCycleDuration(null);
    setSettingsVisibility(false);
  }

  const [isSettingsVisible, setSettingsVisibility] = React.useState(false);
  const handleOpen = () => {
    setSettingsVisibility(true);
  };

  const handleClose = () => {
    setSettingsVisibility(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setVisibleItemIndex(visibleItemIndex === (Object.keys(data).length - 1) ? 0 : visibleItemIndex + 1);
    }, (cycleDuration + transitionDuration));
  }, [visibleItemIndex]);

  useEffect(() => {
    getWeatherDataByCity(dispatch, {
      units: unitType
    });
  }, [unitType]);

  const refreshWidget = () => {
    getWeatherDataByCity(dispatch, {
      units: unitType
    });
  }

  return <div className={'weather global'}>
    {dataState === DATA_STATE.FETCHING && <div className={'loader-container'}><CircularProgress /></div>}
    {dataState === DATA_STATE.READY && <>
      <div className={'widget-controls'}>
        <span className={'icon'} onClick={handleOpen}><FontAwesomeIcon icon={faCog} size={'sm'}/></span>
        <span className={'icon'} onClick={refreshWidget}><FontAwesomeIcon icon={faSyncAlt} size={'sm'}/></span>
        <Modal
          className={classNames('modal-presentation-layer')}
          open={isSettingsVisible}
          onClose={handleClose}
        >
          <Zoom in={isSettingsVisible} timeout={0}>
            <div className={classNames('modal-content', theme)}>
              <div className={'title'}>Settings</div>
              <input type={'number'}
                     defaultValue={cycleDuration / 1000}
                     onChange={e => handleCyleDurationChange(e.target.value)}
                     placeholder={'Set transition interval'}/>
              <label className={'hint'}>Add transition interval in sec</label>
              <div className={'button apply'} onClick={applyCyleDurationChange}>Apply changes</div>
            </div>
          </Zoom>
        </Modal>
      </div>
      {Object.keys(data).map((key: string, index: number) => {
        const item = data[key];

        return <Transition key={key} in={visibleItemIndex === index} timeout={transitionDuration}>
          {state => (
            <div className={'widget-item'}
                 style={{
                   ...defaultStyle,
                   ...transitionStyles[state]
                 }}>
              <div className={'title'}>
                <h4>{key}</h4>
                <div>Last refresh: {moment(item.dt * 1000).format('HH:mm')}</div>
                <div>Local time: {moment((item.dt + item.timezone) * 1000).format('dddd HH:mm')}</div>
              </div>
              <div className={'current'}>
                <span className={'value'}>{formatTemperature(item.main.temp, unitType)}</span>
                <img className={'icon'} src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}/>
                <span className={'description'}>{item.weather[0].description}</span>
              </div>
            </div>
          )}
        </Transition>
      })}
    </>}
  </div>
};

export default GlobalWeatherWidget