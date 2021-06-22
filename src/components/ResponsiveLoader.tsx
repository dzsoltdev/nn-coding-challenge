import React from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
import '../styles/components/loader.scss';

const ResponsiveLoader = () => {
  return <div className={'responsive-loader-container'}><CircularProgress /></div>
}

export default ResponsiveLoader;